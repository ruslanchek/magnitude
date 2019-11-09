import { Store } from 'react-stores';
import { IApiAuthMe } from '../api/ApiAuth';

interface IState {
  me: IApiAuthMe | null;
  authorized: boolean;
}

export const authStore = new Store<IState>({
  me: null,
  authorized: false,
});
