/* Global Variables */
const baseURL = "http://api.geonames.org/searchJSON?q=";
const apiKey = "&maxRows=10&username=cpigeon";

// Create a new date instance dynamically with JS
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let d = new Date();
let newDate = months[d.getMonth()]+' '+ d.getDate()+', '+ d.getFullYear();

// Event Listener - Click on Element with ID 'generate'
document.getElementById('generate').addEventListener('click', performAction);

// Event Listener Callback Function: performAction
function performAction(event) {
  const dest = document.getElementById('dest').value;
  const depDate = document.getElementById('depDate').value;
  console.log(depDate);
  console.log(newDate);
  console.log(d);
  const retDate = document.getElementById('retDate').value;
  getLocation(baseURL, dest, apiKey);
  // getWeather(baseURL, zip, apiKey)
  //   .then(function(data) {
  //     postData('/', {temp: data.main.temp, date: newDate, entry: response);
  //   })
  //   .then(() => updateUI());
}

// Async function that uses fetch() to make a GET request to the Geonames API
const getLocation = async (baseURL, dest, apiKey) => {
  console.log(baseURL + dest + apiKey)
  const res = await fetch(baseURL+dest+apiKey);
  try {
    const data = await res.json();
    console.log(data);
    console.log(data.geonames[0]);
    console.log(data.geonames[0].countryCode);
    console.log(data.geonames[0].lat);
    console.log(data.geonames[0].lng);
    return data;
  } catch(error) {
    console.log("error", error);
  }
}

// function getCountdown(depDate) {
//   var now = new Date();
//   var start = new Date(now.getFullYear(), 0, 0);
//   var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
//   var oneDay = 1000 * 60 * 60 * 24;
//   var day = Math.floor(diff / oneDay);
// }

// Async function that uses fetch() to make a GET request to the OpenWeatherMap API
const getWeather = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL+zip+apiKey);
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log("error", error);
  }
}

// Async function that uses fetch() to make a POST request to add the API data to the app
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: 'POST', // access the POST route setup in server side code
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data), // how we access data on the server side - data sent to a web server has to be a STRING and it is attached to the body of the request
  });

  try {
    const newData = await res.json();
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}

const updateUI = async () => {
  const req = await fetch('/add');
  try {
    const allData = await req.json();
    document.getElementById('date').innerHTML = "Today's Date: " + allData.date;
    document.getElementById('location').innerHTML = "Location: " + allData.location;
    document.getElementById('zipEntry').innerHTML = "Zip Code: " + allData.zip;
    document.getElementById('temp').innerHTML = "Current Temperature: " + allData.temp;
    document.getElementById('highTemp').innerHTML = "High: " + allData.highTemp;
    document.getElementById('lowTemp').innerHTML = "Low: " + allData.lowTemp;
    document.getElementById('content').innerHTML = "I'm feeling: " + allData.entry;
  } catch(error) {
    console.log("error", error);
  }
}


export { performAction }
export { getWeather }
export { postData }
