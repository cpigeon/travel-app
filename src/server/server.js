// Setup empty JS object to act as endpoint for all routes
travelData = {};

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

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
})

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
app.get('/get', function(req, res) {
  res.send(travelData);
})

export { addData }
