/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { ERouteType } from '../../constants/paths';

export const NoMatchPage: React.FC = () => {
  return (
    <ScreenWrapper raw={true} routeType={ERouteType.Public}>
      <div css={styles.root}>NoMatchPage</div>
    </ScreenWrapper>
  );
};

const styles = {
  root: css``,

  wrapper: css``,
};
