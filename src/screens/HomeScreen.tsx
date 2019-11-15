/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { SocketApi } from '../api/SocketApi';
import { AuthApi } from '../api/AuthApi';

SocketApi.connect();

SocketApi.onConnectionChanged(connected => {
  if (connected) {
    // AuthApi.authorize();
    AuthApi.register('rshashkov+2@icloud.com', 'tukzara1');
  }
});

export const HomeScreen: React.FC = () => {
  return (
    <PageWrapper>
      <div css={styles.root}>xxx</div>
    </PageWrapper>
  );
};

const styles = {
  root: css``,

  wrapper: css``,
};
