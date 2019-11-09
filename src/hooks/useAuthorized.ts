import { useStore } from 'react-stores';
import { authStore } from '../stores/authStore';

export function useAuthorized() {
  const authStoreState = useStore(authStore);
}
