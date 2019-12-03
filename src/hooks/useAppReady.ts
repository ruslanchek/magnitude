import { useStore } from 'react-stores';
import { appStore } from '../stores/appStore';

export function useAppReady(): boolean {
  return useStore(appStore, {
    mapState: state => {
      return state.isReady;
    },
  });
}
