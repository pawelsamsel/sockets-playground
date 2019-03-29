import openSocket from 'socket.io-client';
import getHost from '../../helpers/getHost';

class SocketIo {
  constructor() {
    this.io = null;
    this.initializeSocket();
    console.log('constructor')
  }

  initializeSocket() {
    console.debug('initializeSocket()');
    const host = getHost();
    this.io = openSocket(host);
  }

  on(eventName, messageHandler) {
    this.io.on(eventName, messageHandler);
  }
}


export default new SocketIo();
