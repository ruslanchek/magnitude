import { SocketApi } from './SocketApi';
import { ESocketAction, IClientDtoProjectCreate, IServerDtoProjectCreate } from '@ruslanchek/magnitude-shared';

export class ProjectApi extends SocketApi {
  static async create(title: string) {
    console.log('xxx');
    const result = await this.ask<IClientDtoProjectCreate, IServerDtoProjectCreate>(ESocketAction.ProjectCreate, {
      title,
    });

    console.log(result);
  }
}
