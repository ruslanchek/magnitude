/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';

export const NoMatchPage: React.FC = () => {
  return (
    <ScreenWrapper>
      <div css={styles.root}>NoMatchPage</div>
    </ScreenWrapper>
  );
};

const styles = {
  root: css``,

  wrapper: css``,
};
