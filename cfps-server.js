'use strict';

const io = require('socket.io-client');
const apiServer = io.connect('http://localhost:3001/cfps');
const express = require('express');
const app = express();

app.get('/home', (req, res) => {
  res.send('OK');
});

app.post('/delivery/:retailer/:code', (req, res, next) => {
  let {retailer} = req.params;
  let {code} = req.params;
  let content = {
    retailer: retailer,
    code: code,
  };
  apiServer.emit('package-delivery', content);
  res.json(content);
});

app.listen(3000, () => console.log('Listening on 3000'));