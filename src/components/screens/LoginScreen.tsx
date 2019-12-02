/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';

export const LoginScreen: React.FC = () => {
  return (
    <ScreenWrapper raw>
      <div css={styles.root}>
        Login
      </div>
    </ScreenWrapper>
  );
};

const styles = {
  root: css``,

  wrapper: css``,
};
