/** @jsx jsx */
import React, { useEffect, useMemo, useState } from 'react';
import { css, jsx } from '@emotion/core';
import ReactTags, { Tag, TagComponentProps } from 'react-tag-autocomplete';
import objstr from 'obj-str';
import { useTranslator } from 'eo-locale';
import { TagIcon } from './TagIcon';
import { colorHash } from '../../../common/colorHash';

interface IProps {
  suggestions?: Tag[];
  tags?: Tag[];
}

const TagComponent: React.FC<TagComponentProps> = ({ tag, classNames, onDelete }) => {
  return (
    <div css={styles.tag} onClick={e => onDelete(e as any)}>
      <TagIcon color={colorHash(tag.name)} />
      <span className='text'>{tag.name}</span>
    </div>
  );
};

export const Tags: React.FC<IProps> = ({ suggestions = [], tags = [] }) => {
  const [localTags, setLocalTags] = useState<Tag[]>(tags);
  const [focus, setFocus] = useState(false);
  const translator = useTranslator();

  const handleDelete = (index: number) => {
    const newTags = localTags.slice(0);
    newTags.splice(index, 1);
    setLocalTags(newTags);
  };

  const handleAddition = (tag: Tag) => {
    const newTags = localTags.concat([tag]);
    setLocalTags(newTags);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  useEffect(() => {
    setLocalTags(tags);
  }, []);

  const suggestionsFiltered = useMemo(() => {
    return suggestions.filter(suggestion => {
      return (
        localTags.findIndex(localTag => {
          return suggestion.id === localTag.id;
        }) < 0
      );
    });
  }, [localTags, suggestions]);

  return (
    <div css={styles.root} className={objstr({ 'react-tags-wrapper': true, focus })}>
      <ReactTags
        allowNew
        autofocus={false}
        autoresize
        allowBackspace
        tags={localTags}
        suggestions={suggestionsFiltered}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        tagComponent={TagComponent}
        placeholder={focus ? translator.translate('InputPlaceholder::AddTag') : ''}
      />
    </div>
  );
};

const styles = {
  root: css`
    .react-tags {
      display: flex;

      &__selected {
        display: flex;
        flex-wrap: wrap;
      }

      &__search-input {
        cursor: text;

        > input {
          font-family: var(--FONT_FAMILY);
          font-size: var(--FONT_SIZE_BASE);
          height: var(--SQUARED_ICON_SIZE);
          line-height: var(--SQUARED_ICON_SIZE);
          box-sizing: border-box;
          outline: none;
          background: none;
          border: none;
        }
      }

      &__search {
        position: relative;
      }

      &__suggestions {
        position: absolute;
        top: 0;
        background-color: red;
      }
    }
  `,

  tag: css`
    display: flex;
    align-items: center;
    height: var(--SQUARED_ICON_SIZE);
    line-height: var(--SQUARED_ICON_SIZE);
    border-radius: var(--BORDER_RADIUS_SMALL);
    background: rgb(var(--WHITE));
    box-sizing: border-box;
    margin-right: var(--INPUT_SIDE_PADDING);
    border: none;
    cursor: pointer;
    border: 1px solid rgb(var(--INPUT_BORDER));
    transition: border-color 0.2s;
    user-select: none;

    .text {
      padding: 0 1ex 0 0;
    }

    &:hover {
      border-color: hsl(var(--INPUT_BORDER_HSL_D1));
    }
  `,
};
