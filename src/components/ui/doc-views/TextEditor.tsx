/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useMemo, useState, useCallback, MouseEvent } from 'react';
import { createEditor, Transforms, Editor, Node } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';

interface IProps {}

interface IMarkButtonProps {
  format: EMarkFormat;
  icon: EIcon;
}

interface IBlockButtonProps {
  format: EBlockFormat;
  icon: EIcon;
}

interface IButtonProps {
  active: boolean;
  onMouseDown: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface IIconProps {
  name: EIcon;
}

interface IElementProps {
  attributes: any;
  element: any;
}

interface ILeafProps {
  attributes: any;
  leaf: any;
}

enum EMarkFormat {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'undefline',
  Code = 'code',
}

enum EBlockFormat {
  HeadingOne = 'heading-one',
  HeadingTwo = 'heading-two',
  BlockQuote = 'block-quote',
  NumberedList = 'numbered-list',
  BulletedList = 'bulleted-list',
}

enum EIcon {
  Bold,
  Italic,
  Underline,
  Code,
  HeadingOne,
  HeadingTwo,
  BlockQuote,
  NumberedList,
  BulletedList,
}

const HOTKEYS_MAP = new Map<string, EMarkFormat>();

HOTKEYS_MAP.set('mod+b', EMarkFormat.Bold);
HOTKEYS_MAP.set('mod+i', EMarkFormat.Italic);
HOTKEYS_MAP.set('mod+u', EMarkFormat.Underline);
HOTKEYS_MAP.set('mod+`', EMarkFormat.Code);

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const TextEditor: React.FC<IProps> = () => {
  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={value} onChange={v => setValue(v)}>
      <Toolbar>
        <MarkButton format={EMarkFormat.Bold} icon={EIcon.Bold} />
        <MarkButton format={EMarkFormat.Italic} icon={EIcon.Italic} />
        <MarkButton format={EMarkFormat.Underline} icon={EIcon.Underline} />
        <MarkButton format={EMarkFormat.Code} icon={EIcon.Code} />
        <BlockButton format={EBlockFormat.HeadingOne} icon={EIcon.HeadingOne} />
        <BlockButton format={EBlockFormat.HeadingTwo} icon={EIcon.HeadingTwo} />
        <BlockButton format={EBlockFormat.BlockQuote} icon={EIcon.BlockQuote} />
        <BlockButton format={EBlockFormat.NumberedList} icon={EIcon.NumberedList} />
        <BlockButton format={EBlockFormat.BulletedList} icon={EIcon.BulletedList} />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        data-gramm='true'
        spellCheck
        autoFocus
        onKeyDown={event => {
          HOTKEYS_MAP.forEach((value, key) => {
            if (isHotkey(key)(event as any)) {
              event.preventDefault();
              toggleMark(editor, value);
            }
          });
        }}
      />
    </Slate>
  );
};

const toggleBlock = (editor: Editor, format: EBlockFormat) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: Editor, format: EMarkFormat) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: Editor, format: EBlockFormat) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor: Editor, format: EMarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Toolbar: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

const Element: React.FC<IElementProps> = ({ attributes, element, children }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf: React.FC<ILeafProps> = ({ attributes, leaf, children }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton: React.FC<IBlockButtonProps> = ({ format, icon }) => {
  const editor = useSlate();

  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}>
      <Icon name={icon} />
    </Button>
  );
};

const MarkButton: React.FC<IMarkButtonProps> = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}>
      <Icon name={icon} />
    </Button>
  );
};

const Button: React.FC<IButtonProps> = ({ children, onMouseDown }) => {
  return <button onMouseDown={onMouseDown}>{children}</button>;
};

const Icon: React.FC<IIconProps> = ({ name }) => {
  return <i>{name}</i>;
};

const styles = {
  root: css``,
};
