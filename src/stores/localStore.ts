import { Store } from 'react-stores';

interface IState {}

// TODO: user-related persistence
export const localStore = new Store<IState>(
  {},
  {
    persistence: true,
  },
);
