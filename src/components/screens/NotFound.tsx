/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { ERouteType } from '../../constants/paths';

export const NotFound: React.FC = () => {
  return (
    <ScreenWrapper raw={true} routeType={ERouteType.Public} title={'Title::NotFound'}>
      <div css={styles.root}>Not Found</div>
    </ScreenWrapper>
  );
};

const styles = {
  root: css``,

  wrapper: css``,
};
