/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { Auth, EMode } from '../modules/Auth';
import { ERouteType } from '../../constants/paths';

export const RememberPasswordScreen: React.FC = () => {
  return (
    <ScreenWrapper raw={true} routeType={ERouteType.Unauthorized}>
      <Auth mode={EMode.RememberPassword} />
    </ScreenWrapper>
  );
};
