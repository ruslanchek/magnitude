import { Store } from 'react-stores';

interface IState {
  showSidePanel: boolean;
}

// TODO: user-related persistence
export const localStore = new Store<IState>(
  {
    showSidePanel: true,
  },
  {
    persistence: true,
  },
);
