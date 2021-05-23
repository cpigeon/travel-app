// Setup empty JS object to act as endpoint for all routes
projectData = {};

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
    temp: req.body.temp,
    date: req.body.date,
    zip: req.body.zip,
    entry: req.body.entry,
    location: req.body.location,
    highTemp: req.body.highTemp,
    lowTemp: req.body.lowTemp
  }

  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.zip = req.body.zip;
  projectData.entry = req.body.entry;
  projectData.location = req.body.location;
  projectData.highTemp = req.body.highTemp;
  projectData.lowTemp = req.body.lowTemp;

  res.send(newEntry);
}

// GET Route that returns projectData
// reference dist/index.html??? 
app.get('/add', function(req, res) {
  res.send(projectData);
})
