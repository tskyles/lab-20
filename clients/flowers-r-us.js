'use strict';

const io = require('socket.io-client');
const flowers = io.connect('http://localhost:3001/cfps');

flowers.emit('subscribe', { event: 'Delivered', clientID: 'flowers-r-us'});

flowers.on('package-delivery', payload => {
  if (payload.payload.retailer === 'flowers-r-us') console.log('Delivered', payload);
});