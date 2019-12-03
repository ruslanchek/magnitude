export const PATHS = {
  HOME: '/',
  ME: '/me',
  TEAMS: '/teams',
  PROJECTS: '/projects',
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
};

export const PROTECTED_PATHS = [PATHS.ME, PATHS.HOME];
export const ONLY_UNPROTECTED_ROUTES = [PATHS.AUTH_LOGIN, PATHS.AUTH_REGISTER];
