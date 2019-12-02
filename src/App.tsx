import React from 'react';
import { RootRouter } from './RootRouter';
import { EOLocale } from 'eo-locale';
import { en } from './locales/en';

export const App: React.FC = () => {
  return (
    <EOLocale.Provider language='en' locales={en}>
      <div className='App'>
        <RootRouter />
      </div>
    </EOLocale.Provider>
  );
};
