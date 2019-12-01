// @ts-ignore
import * as io from 'socket.io-client';
import { Api } from './Api';
import { ISocketClientPacket, ESocketAction, ISocketServerPacket, ESocketError } from '@ruslanchek/magnitude-shared';

export class SocketApi extends Api {
  protected static socket: any = null;
  protected static connected: boolean = false;
  protected static onConnectionChangedCallback = (connected: boolean) => {};
  private static currentNs: number = 0;

  public static onConnectionChanged(callback: (connected: boolean) => void) {
    this.onConnectionChangedCallback = callback;
  }

  protected static formAskPacket<T>(data: T): ISocketClientPacket<T> {
    return {
      data,
      token: this.getToken(),
      ns: this.generateNs(),
    };
  }

  private static connectionChanged(connected: boolean) {
    this.connected = connected;
    this.onConnectionChangedCallback(this.connected);
  }

  private static generateNs(): string {
    this.currentNs++;
    return this.currentNs.toString();
  }

  public static connect() {
    this.socket = io(process.env.REACT_APP_API_URL);

    (window as any)['io'] = this.socket;

    this.socket.on('connect', () => {
      this.connectionChanged(true);
    });

    this.socket.on('disconnect', () => {
      this.connectionChanged(false);
    });
  }

  public static on<ServerDto>(action: ESocketAction, callback: (packet: ISocketServerPacket<ServerDto>) => void) {
    this.socket.on(action, callback);
  }

  public static off(action: ESocketAction) {
    this.socket.off(action);
  }

  public static ask<ClientDto, ServerDto>(
    action: ESocketAction,
    packet: ClientDto,
  ): Promise<ISocketServerPacket<ServerDto>> {
    return new Promise(resolve => {
      const askPacket = this.formAskPacket<ClientDto>(packet);
      const askAction = `${action}_${askPacket.ns}`;

      this.socket.on(askAction, (data: ISocketServerPacket<ServerDto>) => {
        if (data.error && data.error.code === ESocketError.InvalidToken) {
          return this.logout();
        }

        this.socket.off(askAction);
        resolve(data);
      });

      this.socket.emit(action, askPacket);
    });
  }
}
