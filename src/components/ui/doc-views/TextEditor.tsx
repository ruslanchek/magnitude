/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useMemo, useState, useCallback, MouseEvent } from 'react';
import { createEditor, Transforms, Editor, Node } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import {
  MdFormatQuote,
  MdFormatBold,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdLooksTwo,
  MdLooksOne,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
} from 'react-icons/md';
import objstr from 'obj-str';

interface IProps {
  value: Node[];
}

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

interface IToolbarProps {
  focus: boolean;
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
  Underlined = 'undeflined',
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
  Underlined,
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
HOTKEYS_MAP.set('mod+u', EMarkFormat.Underlined);
HOTKEYS_MAP.set('mod+`', EMarkFormat.Code);

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const TextEditor: React.FC<IProps> = ({ value }) => {
  const [focus, setFocus] = useState(false);
  const [localValue, setLocalValue] = useState<Node[]>(value);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const handleRootClick = () => {};

  return (
    <div css={styles.root} className={objstr({ focus, 'input-styles hidden': true })} onClick={handleRootClick}>
      <Slate editor={editor} value={localValue} onChange={v => setLocalValue(v)}>
        <Editable
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          data-gramm='true'
          spellCheck
          onKeyDown={event => {
            HOTKEYS_MAP.forEach((value, key) => {
              if (isHotkey(key)(event as any)) {
                event.preventDefault();
                toggleMark(editor, value);
              }
            });
          }}
        />
        <Toolbar focus={focus}>
          <MarkButton format={EMarkFormat.Bold} icon={EIcon.Bold} />
          <MarkButton format={EMarkFormat.Italic} icon={EIcon.Italic} />
          <MarkButton format={EMarkFormat.Underlined} icon={EIcon.Underlined} />
          <MarkButton format={EMarkFormat.Code} icon={EIcon.Code} />
          <BlockButton format={EBlockFormat.HeadingOne} icon={EIcon.HeadingOne} />
          <BlockButton format={EBlockFormat.HeadingTwo} icon={EIcon.HeadingTwo} />
          <BlockButton format={EBlockFormat.BlockQuote} icon={EIcon.BlockQuote} />
          <BlockButton format={EBlockFormat.NumberedList} icon={EIcon.NumberedList} />
          <BlockButton format={EBlockFormat.BulletedList} icon={EIcon.BulletedList} />
        </Toolbar>
      </Slate>
    </div>
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

const Toolbar: React.FC<IToolbarProps> = ({ focus, children }) => {
  return (
    <div css={styles.toolbar} className={objstr({ focus })}>
      {children}
    </div>
  );
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

const Button: React.FC<IButtonProps> = ({ active, onMouseDown, children }) => {
  return (
    <button className={objstr({ active })} css={styles.button} onMouseDown={onMouseDown}>
      {children}
    </button>
  );
};

const Icon: React.FC<IIconProps> = ({ name }) => {
  switch (name) {
    case EIcon.BlockQuote: {
      return <MdFormatQuote />;
    }

    case EIcon.Bold: {
      return <MdFormatBold />;
    }

    case EIcon.BulletedList: {
      return <MdFormatListBulleted />;
    }

    case EIcon.Code: {
      return <MdCode />;
    }

    case EIcon.HeadingOne: {
      return <MdLooksOne />;
    }

    case EIcon.HeadingTwo: {
      return <MdLooksTwo />;
    }

    case EIcon.Italic: {
      return <MdFormatItalic />;
    }

    case EIcon.Underlined: {
      return <MdFormatUnderlined />;
    }

    case EIcon.NumberedList: {
      return <MdFormatListNumbered />;
    }

    default: {
      return null;
    }
  }
};

const styles = {
  root: css`
    overflow: hidden;
  `,

  toolbar: css`
    opacity: 0;
    transition: opacity 0.1s, transform 0.1s;
    display: flex;
    transform: translateY(30px);

    &.focus {
      opacity: 1;
      transform: translateY(0);
    }
  `,

  button: css`
    font-size: 20px;
    line-height: 15px;
    outline: none;
    -webkit-appearance: none;
    width: 26px;
    height: 26px;
    text-align: center;
    border: none;
    background: none;
    text-align: center;
    overflow: hidden;
    color: rgb(var(--TEXT_LIGHT));
    border-radius: 3px;
    margin-right: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    padding: 0;

    &:hover {
      opacity: 1;
      color: rgb(var(--TEXT));
    }

    &.active {
      color: rgb(var(--ACCENT));
      background-color: rgba(var(--ACCENT), 0.1);
    }
  `,
};
