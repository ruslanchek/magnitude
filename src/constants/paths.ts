export enum ERouteType {
  Public,
  Authorized,
  Unauthorized,
}

export interface IPath {
  path: string;
  type: ERouteType;
}

export const PATHS: Record<string, IPath> = {
  HOME: { path: '/', type: ERouteType.Authorized },
  ME: { path: '/me', type: ERouteType.Authorized },
  TEAMS: { path: '/teams', type: ERouteType.Authorized },
  MESSAGES: { path: '/messages', type: ERouteType.Authorized },
  PROJECTS: { path: '/projects', type: ERouteType.Authorized },
  PROJECT: { path: '/projects/:id', type: ERouteType.Authorized },
  AUTH_LOGIN: { path: '/auth/login', type: ERouteType.Unauthorized },
  AUTH_REGISTER: { path: '/auth/register', type: ERouteType.Unauthorized },
  AUTH_REMEMBER_PASSWORD: { path: '/auth/password-reset', type: ERouteType.Unauthorized },
};

export const AUTHORIZED_ENTRY_POINT = PATHS.HOME;
export const UNAUTHORIZED_ENTRY_POINT = PATHS.AUTH_LOGIN;
