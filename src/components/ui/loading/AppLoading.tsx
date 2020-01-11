/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { ActivityIndicator } from './ActivityIndicator';

export const AppLoading: React.FC = () => {
  return (
    <div css={styles.root}>
      <ActivityIndicator size='large' color='rgb(var(--ACCENT))' />
    </div>
  );
};

const styles = {
  root: css`
    height: 100vh;
    width: 100vw;
    position: fixed;
    background-color: rgb(var(--BG));
    z-index: 10000;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
