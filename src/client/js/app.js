/* Global Variables */
// Geonames API
const baseURL = "http://api.geonames.org/searchJSON?q=";
const apiKey = "&maxRows=10&username=cpigeon";

// WeatherBit API
const baseURLWBForecast = "http://api.weatherbit.io/v2.0/forecast/daily?";
const baseURLWBCurrent = "http://api.weatherbit.io/v2.0/current?";
const apiKeyWB = "&units=I&key=db08c6000268439a9d428477e8023336";
var baseURLWB = "";

// Pixabay API
const baseURLPix = "https://pixabay.com/api/";
const apiKeyPix = "?key=21911457-91515483c6a5cd8fb9889335f";

// Event Listener - Click on Element with ID 'generate'
document.getElementById('generate').addEventListener('click', performAction);

// Event Listener Callback Function: performAction
function performAction(event) {
  const dest = document.getElementById('dest').value;
  const depDate = document.getElementById('depDate').value;
  const retDate = document.getElementById('retDate').value;
  const countdown = getCountdown(depDate);
  const tripLength = getTripLength(depDate, retDate);
  if (countdown <= 7) {
    baseURLWB = baseURLWBCurrent;
  } else {
    baseURLWB = baseURLWBForecast;
  }
  getLocation(baseURL, dest, apiKey)
    .then(function(data) {
      return getWeather(baseURLWB, data.geonames[0].lat, data.geonames[0].lng, apiKeyWB)
    })
    .then(function(data) {
      return postData('/', {data: data.data, destination: dest, count: countdown, departureDate: depDate, length: tripLength})
    })
    .then(function(data) {
      return getPicture(baseURLPix, apiKeyPix, dest)
    })
    .then(function(data) {
      updateUI(data.hits[0].webformatURL)
    })
}

// Function that generates the trip countdown
function getCountdown(depDate) {
  const now = new Date();
  const nowSeconds = Date.parse(now);
  const depDateSeconds = Date.parse(depDate);
  const diff = Math.abs(depDateSeconds - nowSeconds);
  const days = Math.ceil(diff / (1000 * 3600 * 24));
  return days;
}

// Function that generates the trip length
function getTripLength(depDate, retDate) {
  const depDateSeconds = Date.parse(depDate);
  const retDateSeconds = Date.parse(retDate);
  const diff = Math.abs(depDateSeconds - retDateSeconds);
  const tripLength = Math.ceil(diff / (1000 * 3600 * 24));
  return tripLength;
}

// Async function that uses fetch() to make a GET request to the Geonames API
const getLocation = async (baseURL, dest, apiKey) => {
  const res = await fetch(baseURL+dest+apiKey);
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log("error", error);
  }
}

// Async function that uses fetch() to make a GET request to the WeatherBit API
const getWeather = async (baseURLWB, lat, long, apiKeyWB) => {
  const res = await fetch(baseURLWB+"&lat="+lat+"&lon="+long+apiKeyWB);
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log("error", error);
  }
}

// Async function that uses fetch() to make a GET request to the Pixabay API
const getPicture = async (baseURLPix, apiKeyPix, dest) => {
  const res = await fetch(baseURLPix+apiKeyPix+"&q="+dest+"&image_type=photo");
  try {
    const data = await res.json();
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
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}

const updateUI = async (imageURL) => {
  const req = await fetch('http://localhost:8081/data');
  try {
    const allData = await req.json();
    document.getElementById('picture').src = imageURL;
    document.getElementById('picture').alt = allData.destination;
    document.getElementById('location').innerHTML = "Your trip to " + allData.destination + " is " + allData.countdown + " days away!";
    document.getElementById('length').innerHTML = "Your trip is " + allData.tripLength + " days long";
    if (allData.countdown <= 7) {
      // if trip is <= 7 days away, display current weather forecast
      document.getElementById('weather').innerHTML = "Current Weather: " + allData.data[0].temp + " deg F ";
      const iconImage = document.createElement('img');
      iconImage.id = "icon";
      iconImage.src  = "https://www.weatherbit.io/static/img/icons/" + allData.data[0].weather.icon +".png"
      iconImage.alt = "weather icon"
      document.getElementById('weather').appendChild(iconImage);
    }
    else {
      // if trip is > 7 days away, display 10 day weather forecast (using a for loop)
      document.getElementById('forecast').innerHTML = "10 Day Weather Forecast";
      for (var i = 0; i < 10; i++) {
        const newDiv = document.createElement('div');
        newDiv.id = "day"
        const dateDiv = document.createElement('div');
        dateDiv.textContent = allData.data[i].datetime;
        const highDiv = document.createElement('div');
        highDiv.textContent = allData.data[i].high_temp;
        const lowDiv = document.createElement('div');
        lowDiv.textContent = allData.data[i].low_temp;
        const iconImage = document.createElement('img');
        iconImage.id = "icon";
        iconImage.src  = "https://www.weatherbit.io/static/img/icons/" + allData.data[0].weather.icon +".png"
        iconImage.alt = "weather icon"
        newDiv.appendChild(dateDiv);
        newDiv.appendChild(highDiv);
        newDiv.appendChild(iconImage);
        newDiv.appendChild(lowDiv);
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
