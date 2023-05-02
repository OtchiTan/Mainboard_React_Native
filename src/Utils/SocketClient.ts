import {Socket, io} from 'socket.io-client';
import {getToken} from './AuthStorage';
import {NavigationProp} from '@react-navigation/native';
import {RoutesList} from './Declarations';

export class SocketClient {
  public socket?: Socket;
  public navigation: NavigationProp<RoutesList>;

  constructor(navigation: NavigationProp<RoutesList>) {
    this.navigation = navigation;
  }

  async init(callback: (socket: Socket) => void) {
    this.socket = io('https://api.otchi.ovh/applications', {
      auth: {token: `Bearer ${await getToken()}`},
      secure: true,
    });

    this.socket.on('connect', () => {
      if (this.socket) callback.bind(this)(this.socket);
    });

    this.socket.on('disconnect', reason => {
      if (reason === 'io server disconnect') this.navigation.navigate('Login');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
