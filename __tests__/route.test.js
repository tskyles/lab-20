'use strict';

const supertest = require('supertest');
const express = require('express');
const app = express();

describe('/POST parameters', () => {

  xit('Connects to home route', () => {
    supertest(app)
      .get('/')
      .then(data => console.log(data))
  })

  xit('Receives correct parameter data', () => {
    supertest(app)
      .post('/delivery/UPS/Boxes')
      .send('Hello')
      .then(data => console.log(data))
  })


});