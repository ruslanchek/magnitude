import { SocketApi } from './SocketApi';
import {
  ESocketAction,
  IClientDtoAuthAuthorize,
  IServerDtoAuthAuthorize,
  IClientDtoAuthRegister,
  IServerDtoAuthRegister,
  IClientDtoAuthLogin,
  IServerDtoAuthLogin,
  IClientDtoAuthMe,
  IServerDtoAuthMe,
} from '@ruslanchek/magnitude-shared';

export class AuthApi extends SocketApi {
  static async authorize() {
    return await this.ask<IClientDtoAuthAuthorize, IServerDtoAuthAuthorize>(ESocketAction.AuthAuthorize, {});
  }

  static async register(email: string, password: string) {
    const result = await this.ask<IClientDtoAuthRegister, IServerDtoAuthRegister>(ESocketAction.AuthRegister, {
      email,
      password,
    });
    if (result.data) {
      this.setToken(result.data.token);
    }
    return result;
  }

  static async login(email: string, password: string) {
    const result = await this.ask<IClientDtoAuthLogin, IServerDtoAuthLogin>(ESocketAction.AuthLogin, {
      email,
      password,
    });
    if (result.data) {
      this.setToken(result.data.token);
    }
    return result;
  }

  static async me() {
    return await this.ask<IClientDtoAuthMe, IServerDtoAuthMe>(ESocketAction.AuthMe, {});
  }
}
