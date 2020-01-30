'use server';

const io = require('socket.io')(3000);

io.on('connection', socket => {

  console.log('Connected', socket.id)

});

io.of('/cfps', socket => {

  socket.on()



})

