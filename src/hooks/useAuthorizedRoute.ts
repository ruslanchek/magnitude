import { useStore } from 'react-stores';
import { authStore } from '../stores/authStore';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { AUTHORIZED_ENTRY_POINT, ERouteType, PATHS, UNAUTHORIZED_ENTRY_POINT } from '../constants/paths';
import { appStore } from '../stores/appStore';
import { useMemo } from 'react';

export function useAuthorizedRoute(type: ERouteType) {
  const isAuthorized = useStore(authStore, {
    mapState: state => {
      return state.isAuthorized;
    },
  });
  const isAppReady = useStore(appStore, {
    mapState: state => {
      return state.isReady;
    },
  });
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
