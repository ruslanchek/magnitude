import { CookieStorage } from 'cookie-storage';

export const cookieStorage = new CookieStorage({
  path: '/',
  domain: process.env.REACT_APP_BASE_DOMAIN,
  expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  secure: false,
  sameSite: 'Lax',
});
