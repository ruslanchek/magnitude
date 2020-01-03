/** @jsx jsx */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { jsx, css } from '@emotion/core';
import ReactTags, { Tag } from 'react-tag-autocomplete';

interface IProps {
  suggestions?: Tag[];
  tags?: Tag[];
}

export const Tags: React.FC<IProps> = ({ suggestions = [], tags = [] }) => {
  const [localTags, setLocalTags] = useState<Tag[]>(tags);

  const handleDelete = (index: number) => {
    const newTags = tags.slice(0);
    tags.splice(index, 1);
    setLocalTags(newTags);
  };

  const handleAddition = (tag: Tag) => {
    const newTags = tags.concat(tag);
    setLocalTags(newTags);
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
    <div css={styles.root}>
      <ReactTags
        tags={localTags}
        suggestions={suggestionsFiltered}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
      />
    </div>
  );
};

const styles = {
  root: css``,
};
