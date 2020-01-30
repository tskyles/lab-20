'use server';

const uuid = require('uuid/v4');
const io = require('socket.io')(3001);

io.on('connection', socket => {

  console.log('Connected', socket.id);

});

const retailers = io.of('/cfps');

retailers.on('connection', socket => {
  console.log('Delivery Service', socket.id);

  socket.on('join', room => {
    console.log('joined', room);
    socket.join(room);
  });
  
  socket.on('package-delivery', payload => {
    let content = {
      messageID: uuid(),
      payload: payload,
    };
    retailers.to('retailers').emit('package-delivery', content);
  });
});