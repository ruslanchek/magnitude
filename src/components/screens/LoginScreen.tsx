/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { Auth } from '../modules/Auth';

export const LoginScreen: React.FC = () => {
  return (
    <ScreenWrapper raw>
      <Auth />
    </ScreenWrapper>
  );
};
