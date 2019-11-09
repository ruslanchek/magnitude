import React from 'react';
import { BrowserRouter, Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import { PATHS } from './constants/paths';
import { useAuthorized } from './hooks/useAuthorized';

const Page1 = () => <div>Home</div>;

const Page2: React.FC = () => {
  const m = useRouteMatch();
  useAuthorized();

  return <div>Page: {m && m.path}</div>;
};

export const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to={PATHS.HOME}>Home</Link>
        </li>
        <li>
          <Link to={PATHS.ME}>Me</Link>
        </li>
        <li>
          <Link to={PATHS.AUTH_LOGIN}>Login</Link>
        </li>
        <li>
          <Link to={PATHS.AUTH_REGISTER}>Register</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={PATHS.HOME} component={Page1} />
        <Route exact path={PATHS.ME} component={Page2} />
        <Route exact path={PATHS.AUTH_LOGIN} component={Page2} />
        <Route exact path={PATHS.AUTH_REGISTER} component={Page2} />
      </Switch>
    </BrowserRouter>
  );
};
