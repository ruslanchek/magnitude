/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { SwaggerView } from '../ui/doc-views/SwaggerView';
import { ERouteType } from '../../constants/paths';

export const TestScreen: React.FC = () => {
  return (
    <ScreenWrapper raw={false} routeType={ERouteType.Authorized} title={'Title::Test'}>
      <div css={styles.root}>
        <SwaggerView />
      </div>
    </ScreenWrapper>
  );
};

const styles = {
  root: css``,
  wrapper: css``,
};
