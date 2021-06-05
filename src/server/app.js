// Setup empty JS object to act as endpoint for all routes
const travelData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Require node-fetch
const fetch = require('node-fetch')

// Initialize the main project folder
app.use(express.static('dist'));

// POST Route that adds incoming data
app.post('/', addData);

function addData(req, res) {
  newEntry = {
    data: req.body.data,
    destination: req.body.destination,
    countdown: req.body.count,
    departureDate: req.body.departureDate,
    tripLength: req.body.length
  }

  travelData.data = req.body.data;
  travelData.destination = req.body.destination;
  travelData.countdown = req.body.count;
  travelData.departureDate = req.body.departureDate;
  travelData.tripLength =  req.body.length;

  res.send(newEntry);
}

// GET Route that returns projectData
app.get('/data', function(req, res) {
  res.send(travelData);
})

module.exports = app;
