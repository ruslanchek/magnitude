import { Api } from './Api';
import { authStore } from '../stores/authStore';
import { redirectTo } from '../common/router';
import { PATHS } from '../constants/paths';
import { API_URLS } from '../constants/urls';

export interface IApiAuthRegisterModel {
  email: string;
  password: string;
}

export interface IApiAuthLoginModel {
  email: string;
  password: string;
}

export interface IApiAuthMe {
  id: string;
  email: string;
}

export interface IApiAuthToken {
  token: string;
}

export class ApiAuth extends Api {
  public static redirectToAuth() {
    redirectTo(PATHS.AUTH_LOGIN);
  }

  public static async login(model: IApiAuthLoginModel) {
    const result = await this.fetch<IApiAuthLoginModel, IApiAuthToken>(API_URLS.AUTH_LOGIN, 'post', model);

    if (result.data && result.data.token) {
      this.setToken(result.data.token);
      await this.getMe();
    }

    return result;
  }

  public static async register(model: IApiAuthRegisterModel) {
    const result = await this.fetch<IApiAuthRegisterModel, IApiAuthToken>(API_URLS.AUTH_REGISTER, 'post', model);

    if (result.data && result.data.token) {
      this.setToken(result.data.token);
      await this.getMe();
    }

    return result;
  }

  public static async getMe() {
    const result = await this.fetch<{}, IApiAuthMe>(API_URLS.AUTH_ME, 'get', undefined, true);

    if (result.data) {
      authStore.setState({
        me: result.data,
      });
    }

    return result;
  }
}