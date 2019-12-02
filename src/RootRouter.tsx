import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PATHS } from './constants/paths';
import { HomeScreen } from './components/screens/HomeScreen';
import { NoMatchPage } from './components/screens/NoMatchPage';
import { TestScreen } from './components/screens/TestPage';
import { LoginScreen } from "./components/screens/LoginScreen";
import { RegisterScreen } from "./components/screens/RegisterScreen";

export const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={PATHS.AUTH_LOGIN} component={LoginScreen} />
        <Route exact path={PATHS.AUTH_REGISTER} component={RegisterScreen} />
        <Route exact path={PATHS.HOME} component={HomeScreen} />
        <Route exact path={PATHS.ME} component={TestScreen} />
        <Route exact component={NoMatchPage} />
      </Switch>
    </BrowserRouter>
  );
};
