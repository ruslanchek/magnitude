import React from 'react';
import { useAuthorized } from './hooks/useAuthorized';
import { useAppReady } from './hooks/useAppReady';
import { useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AppController } from './controllers/AppController';
import { PATHS } from './constants/paths';

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
    <React.Fragment>
      {isAppReady ? (
        <React.Fragment>
          {isAuthorizedRoute ? <React.Fragment>{children}</React.Fragment> : <Redirect to={PATHS.AUTH_LOGIN} />}
        </React.Fragment>
      ) : (
        <div>Loading app...</div>
      )}
    </React.Fragment>
  );
};
