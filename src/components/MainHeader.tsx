/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

export const MainHeader: React.FC = () => {
  return <div css={styles.root}>MainHeader</div>;
};

const styles = {
  root: css`
    height: var(--HEADER_HEIGHT);
    display: flex;
    align-items: center;
    padding: 0 var(--PADDING_HORIZONTAL_GLOBAL);
  `,
};
