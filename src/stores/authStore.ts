import { Store } from 'react-stores';
import { IEntityUserShared } from '@ruslanchek/magnitude-shared';

interface IState {
  me: IEntityUserShared | null;
  isAuthorized: boolean;
}

export const authStore = new Store<IState>({
  me: null,
  isAuthorized: false,
});

(window as any)['authStore'] = authStore;
