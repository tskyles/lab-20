'use strict';

const io = require('socket.io-client');
const retailers = io.connect('http://localhost:3001/cfps');

retailers.emit('join', 'retailers');

retailers.on('package-delivery', payload => {
  console.log('Delivered', payload);
});