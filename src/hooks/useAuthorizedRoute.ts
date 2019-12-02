import { useStore } from 'react-stores';
import { authStore } from '../stores/authStore';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { PATHS, PROTECTED_PATHS } from "../constants/paths";

export function useAuthorizedRoute() {
  const authState = useStore(authStore);
  const match = useRouteMatch();
  const history = useHistory();
  const protectedPath = PROTECTED_PATHS.indexOf((match && match.path) || '') >= 0;
  const isRouteAuthorized = !protectedPath || (protectedPath && authState.isAuthorized);

  if(!isRouteAuthorized) {
    history.replace(PATHS.AUTH_LOGIN);
  }
}
