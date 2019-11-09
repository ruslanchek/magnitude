import { useStore } from 'react-stores';
import { authStore } from '../stores/authStore';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { PROTECTED_PATHS } from '../constants/paths';
import { ApiAuth } from "../api/ApiAuth";

export function useAuthorized() {
  const { authorized } = useStore(authStore);
  const match = useRouteMatch();

  useEffect(() => {
    if (!authorized && PROTECTED_PATHS.indexOf(match?.path || '') >= 0) {
      ApiAuth.redirectToAuth();
    }
  }, [authorized, match]);
}
