import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { ERouteType } from '../../constants/paths';
import { Document } from '../document/Document';

export const UiScreen: React.FC = () => {
  return (
    <ScreenWrapper raw={false} routeType={ERouteType.Authorized} title={'Title::Home'}>
      <Document />
    </ScreenWrapper>
  );
};
