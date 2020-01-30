'use strict';

const request = require('supertest');
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
  res.json(content);
});

describe('/POST parameters', () => {

  it('Connects to home route', (done) => {
    request(app)
      .get('/home')
      .expect(200,done);
  });

  it('Receives correct parameter data', () => {
    request(app)
      .post('/delivery/UPS/Boxes')
      .expect(200)
      .then(data => {
        expect(data.body.retailer).toBe('UPS');
        expect(data.body.code).toBe('Boxes');
      });
  });


});