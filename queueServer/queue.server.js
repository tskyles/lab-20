'use server';

const uuid = require('uuid/v4');
const io = require('socket.io')(3001);

const messages = {};

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
    retailers.to('acme-widget').emit('package-delivery', content);
    retailers.to('flowers-r-us').emit('package-delivery', content);
  });

  socket.on('getall', (data)=> {
    try{
      let { event, clientID} = data;
      for (const messageID in messages[event][clientID]) {
        let payload = messages[event][clientID][messageID];
        console.log('sending to', clientID, event);
        io.of('cfps').to(clientID).emit(event, {messageID, payload});
      }
    }
    catch(e) {console.error(e);}
  });

  socket.on('subscribe', payload => {
    let {event,clientID} = payload;

    if (!messages[event]) { messages[event] = {}; }
    if (!messages[event][clientID]) { messages[event][clientID] = {}; }
    console.log('joined', clientID);
    socket.join(clientID);

  });
});