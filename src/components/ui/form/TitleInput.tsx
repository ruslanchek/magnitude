/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

interface IProps {
  value: string;
}

export const TitleInput: React.FC<IProps> = ({ value }) => {
  return (
    <h1 contentEditable css={styles.root}>
      {value}
    </h1>
  );
};

const styles = {
  root: css`
    outline: none;
    padding: calc(var(--INPUT_SIDE_PADDING) * 0.25) var(--INPUT_SIDE_PADDING);
    margin-left: calc(var(--INPUT_SIDE_PADDING) * -1);
    border: 1px solid transparent;
    transition: border-color 0.2s, box-shadow 0.2s;
    border-radius: var(--BORDER_RADIUS_MEDIUM);

    &:hover {
      border-color: rgb(var(--INPUT_BORDER));
    }

    &:focus {
      border-color: rgb(var(--ACCENT));
      border-color: hsl(var(--INPUT_BORDER_DARK));
      box-shadow: var(--SHADOW_INSET);
      box-sizing: border-box;
    }
  `,
};
