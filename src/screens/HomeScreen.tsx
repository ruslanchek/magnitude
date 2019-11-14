/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { SocketApi } from '../api/SocketApi';
import { ESocketAction } from '@ruslanchek/magnitude-shared';

SocketApi.connect();

SocketApi.on(ESocketAction.Authorize, data => {
  console.log(data);
});

SocketApi.onConnectionChanged(connected => {
  if (connected) {
    SocketApi.send<{}>(ESocketAction.Authorize, {});
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
