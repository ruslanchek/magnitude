import { useStore } from 'react-stores';
import { authStore } from '../stores/authStore';
import { useRouteMatch } from 'react-router-dom';
import { PROTECTED_PATHS } from '../constants/paths';

export function useAuthorized(): boolean {
  const authState = useStore(authStore);
  const match = useRouteMatch();
  const protectedPath = PROTECTED_PATHS.indexOf((match && match.path) || '') >= 0;
  return !protectedPath || (protectedPath && authState.isAuthorized);
}
