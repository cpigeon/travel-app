const app = require('../src/server/server') // Link to your server file
// import {app} from '../src/server/server'
const supertest = require('supertest');
// const {response} = require('express');
const request = supertest(app)

it('testing /get endpoint', async done => {
  const response = await request.get('/get')
  expect(response.status).toBe(200)
  expect(response.body).toBeDefined();
  done()
})
