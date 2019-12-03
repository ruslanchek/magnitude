import { useStore } from 'react-stores';
import { authStore } from '../stores/authStore';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { PATHS, PROTECTED_PATHS } from "../constants/paths";
import { appStore } from "../stores/appStore";

export function useAuthorizedRoute() {
  const isAuthorized = useStore(authStore, {
    mapState: state => {
      return state.isAuthorized;
    },
  });
  const appSate = useStore(appStore);
  const match = useRouteMatch();
  const history = useHistory();
  const protectedPath = PROTECTED_PATHS.indexOf((match && match.path) || '') >= 0;
  const isRouteAuthorized = !protectedPath || (protectedPath && isAuthorized);

  if(!isRouteAuthorized && appSate.isReady) {
    history.replace(PATHS.AUTH_LOGIN);
  }
}
