'use strict';

const io = require('socket.io-client');
const cfps = io.connect('http://localhost:3001/cfps');

cfps.emit('join', 'acme');

cfps.on('queued', payload => {
  payload.forEach(item => {
    console.log(item);
    cfps.emit('received', 'acme');
  });
});

cfps.on('package-delivery', payload => {
  console.log(payload);
  cfps.emit('received', 'acme');
});