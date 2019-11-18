import React from 'react';
import { RootRouter } from './RootRouter';
import { EOLocale } from 'eo-locale';
import { en } from './locales/en';
import { HotKeysProvider } from './components/providers/HotKeysProvider';

export const App: React.FC = () => {
  return (
    <EOLocale.Provider language='en' locales={en}>
      <HotKeysProvider>
        <div className='App'>
          <RootRouter />
        </div>
      </HotKeysProvider>
    </EOLocale.Provider>
  );
};
