/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

export const CategoryTitle: React.FC = ({ children }) => {
  return <h3 css={styles.root}>{children}</h3>;
};

const styles = {
  root: css`
    color: rgb(var(--TEXT_FADED));
    font-size: var(--FONT_SIZE_SMALL);
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
  `,
};
