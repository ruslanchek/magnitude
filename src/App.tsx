import React from 'react';
import { RootRouter } from './RootRouter';
import { EOLocale, Translator } from 'eo-locale';
import { locales } from './locales/locales';

export const appTranslator = new Translator('en', locales);
export const App: React.FC = () => {
  return (
    <EOLocale.Provider language='en' locales={locales}>
      <div className='App'>
        <RootRouter />
      </div>
    </EOLocale.Provider>
  );
};
