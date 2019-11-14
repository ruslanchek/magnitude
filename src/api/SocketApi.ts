// @ts-ignore
import * as io from 'socket.io-client';
import { Api } from './Api';

interface ISocketApiPacket<T> {
  data: T;
  token: string | null;
}

export enum ESocketEvent {
  Authorize = 'Authorize',
}

const UNAUTHORIZED_MESSAGE_DATA = 'unauthorized';

type TSocketCallback = (data: any) => void;

export class SocketApi extends Api {
  private static socket: any = null;
  private static connected: boolean = false;
  private static eventPool = new Map<ESocketEvent, TSocketCallback>();
  private static onConnectionChangedCallback = (connected: boolean) => {};

  private static connectionChanged(connected: boolean) {
    this.connected = connected;
    this.onConnectionChangedCallback(this.connected);
  }

  private static formPacket<T>(data: T): ISocketApiPacket<T> {
    return {
      data,
      token: this.getToken(),
    };
  }

  static onConnectionChanged(callback: (connected: boolean) => void) {
    this.onConnectionChangedCallback = callback;
  }

  static connect() {
    this.socket = io(process.env.REACT_APP_WS_API_URL);

    (window as any)['io'] = this.socket;

    this.socket.on('connect', () => {
      this.connectionChanged(true);
    });

    this.socket.on('disconnect', () => {
      this.connectionChanged(false);
    });

    this.socket.on('message', (event: ESocketEvent, data: any) => {
      if (data === UNAUTHORIZED_MESSAGE_DATA) {
        this.logout();
      } else {
        const eventPoolItem = this.eventPool.get(event);

        if (eventPoolItem) {
          eventPoolItem(data);
        }
      }
    });
  }

  static send<T>(event: string, data: T) {
    this.socket.emit(event, this.formPacket<T>(data));
  }

  static on<T>(event: ESocketEvent, callback: (data: T) => void) {
    this.eventPool.set(event, callback);
  }
}
