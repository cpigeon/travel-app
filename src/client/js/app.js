/* Global Variables */
// Geonames API
const baseURL = "http://api.geonames.org/searchJSON?q=";
const apiKey = "&maxRows=10&username=cpigeon";

// WeatherBit API
const baseURLWB = "http://api.weatherbit.io/v2.0/forecast/daily?";
const apiKeyWB = "&units=I&key=db08c6000268439a9d428477e8023336";

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
  const retDate = document.getElementById('retDate').value;
  const countdown = getCountdown(depDate);
  getLocation(baseURL, dest, apiKey)
    .then(function(data) {
      console.log("First .then")
      console.log(typeof data);
      console.log(data);
      return getWeather(baseURLWB, data.geonames[0].lat, data.geonames[0].lng, apiKeyWB)
    })
    .then(function(data) {
      console.log("second .then")
      console.log(typeof data);
      console.log(data);
      return postData('/', {data: data.data, destination: dest, count: countdown, departureDate: depDate})
    })
    .then(() => updateUI());
}

// Async function that uses fetch() to make a GET request to the Geonames API
const getLocation = async (baseURL, dest, apiKey) => {
  // console.log(baseURL + dest + apiKey)
  const res = await fetch(baseURL+dest+apiKey);
  try {
    const data = await res.json();
    // console.log(data);
    // console.log(data.geonames[0]);
    // console.log(data.geonames[0].countryCode);
    // console.log(data.geonames[0].lat);
    // console.log(data.geonames[0].lng);
    return data;
  } catch(error) {
    console.log("error", error);
  }
}

function getCountdown(depDate) {
  var now = new Date();
  var nowSeconds = Date.parse(now);
  var depDateSeconds = Date.parse(depDate);
  var diff = Math.abs(depDateSeconds - nowSeconds);
  var days = Math.ceil(diff / (1000 * 3600 * 24));
  return days;
}

// Async function that uses fetch() to make a GET request to the WeatherBit API
const getWeather = async (baseURLWB, lat, long, apiKeyWB) => {
  // console.log(baseURLWB+"&lat="+lat+"&lon="+long+apiKeyWB);
  const res = await fetch(baseURLWB+"&lat="+lat+"&lon="+long+apiKeyWB);
  try {
    const data = await res.json();
    console.log("Inside of getWeather function (qty 2)")
    console.log(typeof data)
    console.log(data)
    console.log(typeof data.data)
    console.log(data)
    // console.log(data.data);
    // console.log(data.data[0].max_temp);
    // console.log(data.data[0].min_temp);
    // console.log(data.data[0].weather.description);
    return data;
  } catch(error) {
    console.log("error", error);
  }
}

// Async function that uses fetch() to make a POST request to add the API data to the app
const postData = async (url = "", data = {}) => {
  const res = await fetch("http://localhost:8081/", {
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
    console.log("inside of postData")
    console.log(typeof newData);
    console.log(newData)
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}

function dateConvert(days) {
  var result = new Date()
  var day = parseInt(result.getDate(),10) + days;
  var month = result.getMonth();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var newDate = months[month]+' '+ day;
  return newDate;
}

const updateUI = async () => {
  const req = await fetch('/get');
  try {
    const allData = await req.json();
    // document.getElementById('picture').innerHTML = "Picture placeholder";
    document.getElementById('location').innerHTML = "Your trip to " + allData.destination + " is " + allData.countdown + " days away!";
    if (allData.countdown <= 7) {
      document.getElementById('weather').innerHTML = "Current Weather: " + allData.data[0].temp + " deg F " +  allData.data[0].weather.description;
    }
    else {
      document.getElementById('weather').innerHTML = "10 Day Weather Forecast";
      for (var i = 0; i < 10; i++) {
        const newDiv = document.createElement('div');
        const dateDiv = document.createElement('div');
        dateDiv.textContent = "Date: " + dateConvert(i);
        const highDiv = document.createElement('div');
        highDiv.textContent = "High: " + allData.data[i].high_temp;
        const lowDiv = document.createElement('div');
        lowDiv.textContent = "Low: " + allData.data[i].low_temp;
        const descDiv = document.createElement('div');
        descDiv.textContent = "Description: " + allData.data[i].weather.description;
        newDiv.appendChild(dateDiv);
        newDiv.appendChild(highDiv);
        newDiv.appendChild(lowDiv);
        newDiv.appendChild(descDiv);
        document.getElementById('weather').appendChild(newDiv);
      }
    }
  } catch(error) {
    console.log("error", error);
  }
}


export { performAction }
export { getWeather }
export { postData }
