/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import openSocket from 'socket.io-client';

interface IProps {}

export const HomeScreen: React.FC<IProps> = () => {
  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_WS_API_URL as string);

    socket.on('connection', () => {
      console.log('connection');
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

    socket.on('message', (e: any, data: any) => {
      console.log(e, data);
    });

    setInterval(() => {
      socket.emit('events', { name: 'Nest' }, () => {
        console.log('xxx');
      });
    }, 1000);
  });

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
