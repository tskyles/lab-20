'use server';

const uuid = require('uuid/v4');
const io = require('socket.io')(3001);

const queues = {
  flowers: [],
  acme: [],
};

io.on('connection', socket => {
  console.log('Connected', socket.id);
});

const retailers = io.of('/cfps');

retailers.on('connection', socket => {
  console.log('Delivery Service', socket.id);

  socket.on('join', room => {
    console.log('joined', room);
    socket.join(room);
    retailers.to(room).emit('queued', queues[room]);
  });

  socket.on('received', payload => {
    if(payload === 'acme') queues.acme.shift();
    if(payload === 'flowers') queues.flowers.shift();
  });
  
  socket.on('package-delivery', payload => {
    if (payload.retailer === 'acme') {
      queues.acme.push(payload);
      socket.to('acme').emit('package-delivery', payload);
    }

    if(payload.retailer === 'flowers') {
      queues.flowers.push(payload)
      socket.to('flowers').emit('package-delivery', payload);
    }
  });
});