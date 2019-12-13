/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { Auth, EMode } from '../modules/Auth';
import { ERouteType } from '../../constants/paths';

export const LoginScreen: React.FC = () => {
  return (
    <ScreenWrapper raw={true} routeType={ERouteType.Unauthorized} title={'Title::Login'}>
      <Auth mode={EMode.Login} />
    </ScreenWrapper>
  );
};
