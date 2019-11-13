import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PATHS } from './constants/paths';
import { HomeScreen } from './screens/HomeScreen';
import { NoMatchPage } from './screens/NoMatchPage';

export const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/*<Route exact path={PATHS.AUTH_LOGIN} component={Page2} />*/}
        {/*<Route exact path={PATHS.AUTH_REGISTER} component={Page2} />*/}
        <Route exact path={PATHS.HOME} component={HomeScreen} />
        {/*<Route exact path={PATHS.ME} component={Page2} />*/}
        <Route component={NoMatchPage} />
      </Switch>
    </BrowserRouter>
  );
};
