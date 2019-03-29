import React, { PureComponent } from 'react';

import SocketIo from '../../data/SocketIo';


export default class MainDocument extends PureComponent {

  constructor(props) {
    super(props);
    SocketIo.on('message', (data) => {
      console.log('message received', data);
    })
  }

  render() {
    return (
      <div>
        Content
      </div>
    );
  }
}
