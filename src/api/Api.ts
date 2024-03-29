import { cookieStorage } from '../common/cookie';
import { authStore } from '../stores/authStore';

export abstract class Api {
  public static getToken(): string | null {
    return cookieStorage.getItem('token');
  }

  protected static setToken(token: string) {
    cookieStorage.setItem('token', token);
  }

  protected static clearToken() {
    cookieStorage.removeItem('token');
  }

  public static logout() {
    this.clearToken();

    authStore.setState({
      isAuthorized: false,
      me: null,
    });
  }
}
