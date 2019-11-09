import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export function redirectTo(path: string) {
  history.push(path);
}
