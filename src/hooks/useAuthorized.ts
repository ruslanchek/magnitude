import { useStore } from 'react-stores';
import { authStore } from '../stores/authStore';
import { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { PATHS, PROTECTED_PATHS } from '../constants/paths';

export function useAuthorized(): boolean {
  const { authorized } = useStore(authStore);
  const match = useRouteMatch();
  const history = useHistory();
  const protectedPath = PROTECTED_PATHS.indexOf((match && match.path) || '') >= 0;
  const accessGrant = !protectedPath || (protectedPath && authorized);

  useEffect(() => {
    if (!accessGrant) {
      history.replace(PATHS.AUTH_LOGIN);
    }
  }, [accessGrant, history]);

  return accessGrant;
}
