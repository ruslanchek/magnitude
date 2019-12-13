import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PATHS } from './constants/paths';
import { HomeScreen } from './components/screens/HomeScreen';
import { ProjectsScreen } from './components/screens/ProjectsScreen';
import { NotFound } from './components/screens/NotFound';
import { TestScreen } from './components/screens/TestPage';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { RememberPasswordScreen } from './components/screens/RememberPasswordScreen';

export const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={PATHS.AUTH_LOGIN.path} component={LoginScreen} />
        <Route exact path={PATHS.AUTH_REGISTER.path} component={RegisterScreen} />
        <Route exact path={PATHS.AUTH_REMEMBER_PASSWORD.path} component={RememberPasswordScreen} />
        <Route exact path={PATHS.HOME.path} component={HomeScreen} />
        <Route exact path={PATHS.PROJECTS.path} component={ProjectsScreen} />
        <Route exact path={PATHS.PROJECT.path} component={HomeScreen} />
        <Route exact path={PATHS.ME.path} component={TestScreen} />
        <Route exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
