'use strict';

const io = require('socket.io-client');
const acme = io.connect('http://localhost:3001/cfps');


acme.on('package-delivery', payload => {
  if (payload.payload.retailer === 'acme-widget') console.log('Delivered', payload);
});