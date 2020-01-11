import { useHistory, useRouteMatch } from 'react-router-dom';
import { AUTHORIZED_ENTRY_POINT, ERouteType, PATHS, UNAUTHORIZED_ENTRY_POINT } from '../constants/paths';
import { useMemo } from 'react';
import { useAppReady } from './useAppReady';
import { useAuthorized } from './useAuthorized';

export function useAuthorizedRoute(type: ERouteType) {
  const isAuthorized = useAuthorized();
  const isAppReady = useAppReady();
  const match = useRouteMatch();
  const history = useHistory();
  const isPathMatchType = useMemo(() => {
    for (const key in PATHS) {
      if (PATHS.hasOwnProperty(key) && PATHS[key].path === match?.path && PATHS[key].type === type) {
        return true;
      }
    }

    return false;
  }, [match, type]);

  if (isAppReady && isPathMatchType) {
    if (type === ERouteType.Authorized && !isAuthorized) {
      history.replace(UNAUTHORIZED_ENTRY_POINT.path);
    } else if (isAuthorized && type === ERouteType.Unauthorized) {
      history.replace(AUTHORIZED_ENTRY_POINT.path);
    }
  }
}
