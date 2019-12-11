import { SocketApi } from '../api/SocketApi';
import { ESocketAction, IServerDtoAuthMe, IServerDtoGetOwnProjects } from '@ruslanchek/magnitude-shared';
import { AuthApi } from '../api/AuthApi';
import { authStore } from '../stores/authStore';
import { appStore } from '../stores/appStore';
import { projectStore } from '../stores/projectStore';

export class AppController {
  static async init(): Promise<void> {
    if (appStore.state.isReady) {
      return Promise.resolve();
    }

    this.initSocket();
    await Promise.all([this.initSubscriptions(), this.initAuth()]);
    appStore.setState({
      isReady: true,
    });
  }

  private static async initSubscriptions() {
    SocketApi.on<IServerDtoGetOwnProjects>(ESocketAction.ProjectGetOwnProjects, e => {
      if (e.data?.list) {
        projectStore.setState({
          ownProjects: e.data.list,
        });
      }
    });

    SocketApi.on<IServerDtoAuthMe>(ESocketAction.AuthMe, e => {
      if (e.data?.user) {
        authStore.setState({
          me: e.data.user,
        });
      }
    });
  }

  private static async initSocket() {
    SocketApi.onConnectionChanged(async isConnected => {
      console.log('isConnected', isConnected);

      if (isConnected && appStore.state.isReady) {
        await this.initAuth();
      }

      appStore.setState({
        isReconnecting: !isConnected,
      });
    });

    SocketApi.connect();
  }

  public static async initAuth() {
    const authorize = await AuthApi.authorize();
    const me = await AuthApi.me();

    authStore.setState({
      isAuthorized: authorize.error === null,
      me: me?.data?.user || undefined,
    });
  }
}
