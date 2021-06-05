const app = require('../src/server/app.js') // Link to your server file
// import {app} from '../src/server/server'
const supertest = require('supertest');
// const {response} = require('express');
const request = supertest(app)

it('testing /data endpoint', async (done) => {
  const response = await request.get('/data')
  return response;
  expect(response.status).toBe(200)
  expect(response.body).toBeDefined();
  done()
})
