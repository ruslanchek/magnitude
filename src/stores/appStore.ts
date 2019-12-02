import { Store } from 'react-stores';

interface IState {
  isReady: boolean;
  isReconnecting: boolean;
}

export const appStore = new Store<IState>({
  isReady: false,
  isReconnecting: false,
});

(window as any)['appStore'] = appStore;
