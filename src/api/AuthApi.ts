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
    const result = await this.ask<IClientDtoAuthAuthorize, IServerDtoAuthAuthorize>(ESocketAction.AuthAuthorize, {});
    console.log(result);
  }

  static async register(email: string, password: string) {
    const result = await this.ask<IClientDtoAuthRegister, IServerDtoAuthRegister>(ESocketAction.AuthRegister, {
      email,
      password,
    });

    if (result.data) {
      this.setToken(result.data.token);
    }
    console.log(result);
  }

  static async login(email: string, password: string) {
    const result = await this.ask<IClientDtoAuthLogin, IServerDtoAuthLogin>(ESocketAction.AuthLogin, {
      email,
      password,
    });

    if (result.data) {
      this.setToken(result.data.token);
    }
    console.log(result);
  }

  static async me() {
    const result = await this.ask<IClientDtoAuthMe, IServerDtoAuthMe>(ESocketAction.AuthMe, {});
    console.log(result);
  }
}
