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
  IEntityUserShared,
} from '@ruslanchek/magnitude-shared';

export class AuthApi extends SocketApi {
  static async authorize(): Promise<boolean> {
    const result = await this.ask<IClientDtoAuthAuthorize, IServerDtoAuthAuthorize>(ESocketAction.AuthAuthorize, {});
    return !result?.error;
  }

  static async register(email: string, password: string): Promise<IServerDtoAuthRegister | null> {
    const result = await this.ask<IClientDtoAuthRegister, IServerDtoAuthRegister>(ESocketAction.AuthRegister, {
      email,
      password,
    });
    if (result.data) {
      this.setToken(result.data.token);
    }
    return result.data;
  }

  static async login(email: string, password: string): Promise<IServerDtoAuthLogin | null> {
    const result = await this.ask<IClientDtoAuthLogin, IServerDtoAuthLogin>(ESocketAction.AuthLogin, {
      email,
      password,
    });
    if (result.data) {
      this.setToken(result.data.token);
    }
    return result.data;
  }

  static async me(): Promise<IEntityUserShared | null> {
    const result = await this.ask<IClientDtoAuthMe, IServerDtoAuthMe>(ESocketAction.AuthMe, {});
    if (result?.data) {
      return result.data.user;
    } else {
      return null;
    }
  }
}
