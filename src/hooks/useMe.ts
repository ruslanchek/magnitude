import { useStore } from 'react-stores';
import { authStore } from '../stores/authStore';
import { IEntityUserShared } from '@ruslanchek/magnitude-shared';

export function useMe(): IEntityUserShared | null {
  return useStore(authStore, {
    mapState: state => {
      return state.me;
    },
  });
}
