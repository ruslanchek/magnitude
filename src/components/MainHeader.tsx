/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { UI_CONSTANTS } from '../constants/ui-constants';

interface IProps {}

export const MainHeader: React.FC<IProps> = props => {
  const {} = props;

  return <div css={styles.root}>MainHeader</div>;
};

const styles = {
  root: css`
    height: ${UI_CONSTANTS.HEADER_HEIGHT}px;
    display: flex;
    align-items: center;
    padding: 0 ${UI_CONSTANTS.PADDING_SIDE_GLOBAL}px;
  `,
};
