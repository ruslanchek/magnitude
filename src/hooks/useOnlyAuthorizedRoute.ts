import { useStore } from 'react-stores';
import { authStore } from '../stores/authStore';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { ONLY_UNPROTECTED_ROUTES } from "../constants/paths";

export function useOnlyUnauthorizedRoute(redirectPath: string) {
  const isAuthorized = useStore(authStore, {
    mapState: state => {
      return state.isAuthorized;
    },
  });
  const match = useRouteMatch();
  const history = useHistory();
  const unprotectedOnlyPath = ONLY_UNPROTECTED_ROUTES.indexOf((match && match.path) || '') >= 0;
  const isRedirect = unprotectedOnlyPath && isAuthorized;

  if(isRedirect) {
    history.replace(redirectPath);
  }
}
