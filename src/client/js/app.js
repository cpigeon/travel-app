/* Global Variables */
const baseURL = "http://api.geonames.org/search?q=";
const apiKey = "&maxRows=10&username=cpigeon";

// Create a new date instance dynamically with JS
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let d = new Date();
let newDate = months[d.getMonth()]+' '+ d.getDate()+', '+ d.getFullYear();

// Event Listener - Click on Element with ID 'generate'
document.getElementById('generate').addEventListener('click', performAction);

// Event Listener Callback Function: performAction
function performAction(event) {
  const zip = document.getElementById('zip').value;
  const response = document.getElementById('feelings').value;
  getWeather(baseURL, zip, apiKey)
    .then(function(data) {
      postData('/', {temp: data.main.temp, date: newDate, zip: zip, entry: response, location: data.name, highTemp: data.main.temp_max, lowTemp: data.main.temp_min});
    })
    .then(() => updateUI());
}


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
