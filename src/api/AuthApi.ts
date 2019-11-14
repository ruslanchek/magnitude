import { SocketApi } from './SocketApi';
import {
  ESocketAction,
  IClientDtoAuthAuthorize,
  IServerDtoAuthAuthorize,
  IClientDtoAuthRegister,
  IServerDtoAuthRegister,
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
    console.log(result);
  }
}
