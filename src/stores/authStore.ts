import { Store } from 'react-stores';
import { IApiAuthMe } from '../api/ApiAuth';

interface IState {
  me: IApiAuthMe | null;
  authModal: boolean;
}

export const authStore = new Store<IState>({
  me: null,
  authModal: false,
});
