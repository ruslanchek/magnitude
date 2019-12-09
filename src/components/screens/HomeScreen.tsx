/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { ERouteType } from '../../constants/paths';

export const HomeScreen: React.FC = () => {
  return (
    <ScreenWrapper raw={false} routeType={ERouteType.Authorized}>
      <div css={styles.root}>xxsx</div>
    </ScreenWrapper>
  );
};

const styles = {
  root: css``,

  wrapper: css``,
};
