// @ts-ignore
import * as io from 'socket.io-client';
import { Api } from './Api';
import { ISocketClientPacket, ESocketAction, ISocketServerPacket, ESocketError } from '@ruslanchek/magnitude-shared';

export class SocketApi extends Api {
  private static socket: any = io(process.env.REACT_APP_API_URL);
  private static isConnected: boolean = false;
  private static currentNs: number = 0;
  private static onConnectionChangedCallback = (isConnected: boolean) => {};

  public static onConnectionChanged(callback: (isConnected: boolean) => void) {
    this.onConnectionChangedCallback = callback;
  }

  public static connect() {
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
    return new Promise((resolve, reject) => {
      const askPacket = this.formAskPacket<ClientDto>(packet);
      const askAction = `${action}_${askPacket.ns}`;

      this.socket.on(askAction, (data: ISocketServerPacket<ServerDto>) => {
        if (data?.error?.code === ESocketError.InvalidToken) {
          this.logout();
        }

        this.socket.off(askAction as ESocketAction);
        resolve(data);
      });

      this.socket.emit(action, askPacket);
    });
  }

  private static formAskPacket<T>(data: T): ISocketClientPacket<T> {
    return {
      data,
      token: this.getToken(),
      ns: this.generateNs(),
    };
  }

  private static connectionChanged(connected: boolean) {
    this.isConnected = connected;
    this.onConnectionChangedCallback(this.isConnected);
  }

  private static generateNs(): string {
    this.currentNs++;
    return this.currentNs.toString();
  }
}
