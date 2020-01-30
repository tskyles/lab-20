'use strict';

const io = require('socket.io-client');
const acme = io.connect('http://localhost:3001/cfps');

acme.emit('subscribe', { event: 'Delivered', clientID: 'acme-widget'});
acme.emit('getAll', { event: 'Delivered', clientID: 'acme-widget'});

acme.on('package-delivery', payload => {
  if (payload.payload.retailer === 'acme-widget') console.log('Delivered', payload);
});