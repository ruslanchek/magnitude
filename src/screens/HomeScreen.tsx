/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { ESocketEvent, SocketApi } from '../api/SocketApi';
import { ApiAuth } from '../api/ApiAuth';

SocketApi.connect();

SocketApi.on(ESocketEvent.Authorize, data => {
  console.log(data);
});

SocketApi.onConnectionChanged(connected => {
  if (connected) {
    SocketApi.send(ESocketEvent.Authorize);
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
