import { Store } from 'react-stores';
import { IEntityProjectShared } from '@ruslanchek/magnitude-shared';

interface IState {
  ownProjects: IEntityProjectShared[];
}

export const projectStore = new Store<IState>({
  ownProjects: [],
});
