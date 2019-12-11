import { useStore } from 'react-stores';
import { IEntityProjectShared } from '@ruslanchek/magnitude-shared';
import { projectStore } from '../stores/projectStore';

export function useOwnProjects(): IEntityProjectShared[] {
  return useStore(projectStore, {
    mapState: state => {
      return state.ownProjects;
    },
  });
}
