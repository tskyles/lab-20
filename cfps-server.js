'use strict';

const io = require('socket.io-client');
const apiServer = io.connect('http://localhost:3000/cfps');
const express = require('express');
const app = express();

app.post('/delivery/:retailer/:code', (req, res, next) => {
  let {retailer} = req.params;
  let {code} = req.params;
  let content = {
    retailer: retailer,
    code: code,
  };
  console.log(content)
  apiServer.emit('package-delivered', content);
});

app.listen(3000, () => console.log('Listening on 3000'));


