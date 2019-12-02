import { SocketApi } from '../api/SocketApi';
import { ESocketAction } from '@ruslanchek/magnitude-shared';
import { AuthApi } from '../api/AuthApi';
import { authStore } from '../stores/authStore';
import { appStore } from '../stores/appStore';

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

  private static async initSocket() {
    SocketApi.onConnectionChanged(async (isConnected) => {
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
    const isAuthorized = await AuthApi.authorize();
    const me = await AuthApi.me();

    authStore.setState({
      isAuthorized,
      me,
    });
  }

  private static async initSubscriptions() {
    SocketApi.on(ESocketAction.AuthMe, e => {
      console.log(e);
    });
  }
}
