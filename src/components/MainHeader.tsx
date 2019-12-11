/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { useMe } from '../hooks/useMe';

export const MainHeader: React.FC = () => {
  const me = useMe();
  return <div css={styles.root}>{me?.email}</div>;
};

const styles = {
  root: css`
    height: var(--HEADER_HEIGHT);
    display: flex;
    align-items: center;
    padding: 0 var(--PADDING_HORIZONTAL_GLOBAL);
  `,
};
