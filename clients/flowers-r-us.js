'use strict';

const io = require('socket.io-client');
const cfps = io.connect('http://localhost:3001/cfps');

cfps.emit('join', 'flowers');

cfps.on('queued', payload => {
  payload.forEach(item => {
    console.log(item);
    cfps.emit('received', 'flowers');
  });
});

cfps.on('package-delivery', payload => {
  console.log(payload);
  cfps.emit('received', 'flowers');
});