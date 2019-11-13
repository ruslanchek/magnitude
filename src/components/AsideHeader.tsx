/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

export const AsideHeader: React.FC = () => {
  return (
    <div css={styles.root}>
      <div css={styles.logo} />
    </div>
  );
};

const styles = {
  root: css`
    height: var(--HEADER_HEIGHT);
    display: flex;
    align-items: center;
    padding: 0 var(--PADDING_HORIZONTAL_GLOBAL);
  `,

  logo: css`
    width: 130px;
    height: ${130 / 6.75}px;
    background-image: url(${require('../assets/images/logo-full.png')});
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    left: 13px;
  `,
};
