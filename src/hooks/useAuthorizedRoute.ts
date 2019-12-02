import { useStore } from 'react-stores';
import { authStore } from '../stores/authStore';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { PATHS, PROTECTED_PATHS } from "../constants/paths";
import { appStore } from "../stores/appStore";

export function useAuthorizedRoute() {
  const authState = useStore(authStore);
  const appSate = useStore(appStore);
  const match = useRouteMatch();
  const history = useHistory();
  const protectedPath = PROTECTED_PATHS.indexOf((match && match.path) || '') >= 0;
  const isRouteAuthorized = !protectedPath || (protectedPath && authState.isAuthorized);

  if(!isRouteAuthorized && appSate.isReady) {
    history.replace(PATHS.AUTH_LOGIN);
  }
}
