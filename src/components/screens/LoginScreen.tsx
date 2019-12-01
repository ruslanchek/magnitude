/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { PageWrapper } from '../PageWrapper';

export const LoginScreen: React.FC = () => {
  return (
    <PageWrapper>
      <div css={styles.root}>
        Login
      </div>
    </PageWrapper>
  );
};

const styles = {
  root: css``,

  wrapper: css``,
};
