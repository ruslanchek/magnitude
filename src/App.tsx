import React from 'react';
import { RootRouter } from './RootRouter';
import { EOLocale, Translator } from 'eo-locale';
import { locales } from './locales/locales';
import { GlobalStyles } from './components/GlobalStyles';
import {
  Notifications,
  ENotificationsVerticalPosition,
  ENotificationsHorizontalPosition,
} from './components/ui/notifications/Notifications';

export const appTranslator = new Translator('en', locales);
export const App: React.FC = () => {
  return (
    <EOLocale.Provider language='en' locales={locales}>
      <GlobalStyles />
      <Notifications
        verticalOffset='20px'
        horizontalOffset='20px'
        verticalPosition={ENotificationsVerticalPosition.Top}
        horizontalPosition={ENotificationsHorizontalPosition.Right}
        rootContainerSelector='#root-notifications'
        width='220px'>
        <div className='App'>
          <RootRouter />
        </div>
      </Notifications>
    </EOLocale.Provider>
  );
};
