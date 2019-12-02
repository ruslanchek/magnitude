/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

interface IProps {
  small?: boolean;
}

export const Text: React.FC<IProps> = props => {
  return (
    <div css={[styles.root, props.small ? styles.small : null]}>
      {props.children}
    </div>
  );
};

const styles = {
  root: css`
    color: rgb(var(--TEXT));

    &:first-of-type {
      margin-top: 0;
    }
  `,

  small: css`
    font-size: var(--FONT_SIZE_SMALL);
  `,
};
