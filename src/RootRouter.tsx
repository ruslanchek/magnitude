import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useParams
} from "react-router-dom";

const Page1 = () => <div>Home</div>;

const Page2: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Page 2:{id}</div>;
};

export const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/page2/1">Page 2:1</Link>
        </li>

        <li>
          <Link to="/page2/2">Page 2:2</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Page1} />
        <Route exact path="/page2/:id" component={Page2} />
      </Switch>
    </BrowserRouter>
  );
};
