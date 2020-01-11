/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

export const Marker: React.FC = () => {
  return <i css={styles.root} />;
};

const styles = {
  root: css`
    border-radius: 100%;
    background-color: rgb(var(--ERROR));
    width: 6px;
    height: 6px;
    display: block;
    box-shadow: 0 0 0 3px rgba(var(--ERROR), 0.15);
  `,
};
