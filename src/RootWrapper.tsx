import React from 'react';
import { useAuthorized } from './hooks/useAuthorized';
import { useAppReady } from './hooks/useAppReady';
import { useCallback, useEffect } from 'react';
import { AppController } from './controllers/AppController';

export const RootWrapper: React.FC = ({ children }) => {
  const isAuthorizedRoute = useAuthorized();
  const isAppReady = useAppReady();
  const initApp = useCallback(async () => {
    await AppController.init();
  }, []);

  useEffect(() => {
    (async () => {
      await initApp();
    })();
  }, [initApp]);

  return (
    <React.Fragment>{isAppReady ? <React.Fragment>{children}</React.Fragment> : <div>Loading app...</div>}</React.Fragment>
  );
};
