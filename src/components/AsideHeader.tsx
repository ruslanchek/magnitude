/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { UI_CONSTANTS } from '../constants/ui-constants';

export const AsideHeader: React.FC = () => {
  return (
    <div css={styles.root}>
      <div css={styles.logo} />
    </div>
  );
};

const styles = {
  root: css`
    height: ${UI_CONSTANTS.HEADER_HEIGHT}px;
    display: flex;
    align-items: center;
    padding: 0 ${UI_CONSTANTS.PADDING_SIDE_GLOBAL}px;
  `,

  logo: css`
    width: 130px;
    height: ${130 / 6.75}px;
    background-image: url(${require('../assets/images/logo-full.png')});
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
  `,
};
