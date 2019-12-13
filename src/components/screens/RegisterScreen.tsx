/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { Auth, EMode } from '../modules/Auth';
import { ERouteType } from '../../constants/paths';

export const RegisterScreen: React.FC = () => {
  return (
    <ScreenWrapper raw={true} routeType={ERouteType.Unauthorized} title={'Title::Register'}>
      <Auth mode={EMode.Register} />
    </ScreenWrapper>
  );
};
