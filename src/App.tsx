import React from 'react';
import { RootRouter } from './RootRouter';
import { EOLocale } from 'eo-locale';
import { locales } from './locales/locales';
import { GlobalStyles } from './components/GlobalStyles';
import {
  Notifications,
  ENotificationsVerticalPosition,
  ENotificationsHorizontalPosition,
} from './components/ui/notifications/Notifications';
import { Modals } from './components/ui/modal/Modals';

const currentLanguage = 'en';

export const App: React.FC = () => {
  return (
    <EOLocale.Provider language={currentLanguage} locales={locales}>
      <GlobalStyles />
      <Notifications
        verticalOffset='20px'
        horizontalOffset='20px'
        verticalPosition={ENotificationsVerticalPosition.Top}
        horizontalPosition={ENotificationsHorizontalPosition.Right}
        rootContainerSelector='#root-notifications'
        width='220px'>
        <Modals rootContainerSelector='#root-modals'>
          <div className='App'>
            <RootRouter />
          </div>
        </Modals>
      </Notifications>
    </EOLocale.Provider>
  );
};
