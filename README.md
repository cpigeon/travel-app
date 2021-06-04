# Project Description

This project requires you to build a travel app that obtains a desired trip location & date from the user, then displays weather and an image of the location using information obtained from external APIs. If the trip is within 7 days, the current weather is displayed. If the trip is greater than 7 days away, a 10 day weather forecast is displayed.

Three external APIs were used in this project:
- Geonames API: provides lat/lon coordinates for the user entered trip destination
- Weatherbit API: uses the lat/lon from the Geonames API to return weather (current weather if trip is within 7 days, forecasted weather otherwise) for the desired location
- Pixabay API: provides a picture for the travel location

## Installation

In order to run this project, complete the following steps:

- clone the repo onto your machine
- cd into the root of the project directory
- run npm install to install all dependencies
- run 'npm run build-prod' to compile the code
- run 'npm run start' to start up the server
- navigate to http://localhost:8081/ to interact with the web app

## Development Steps
- Write basic HTML/CSS for the travel app
- Setup Webpack
- Integrate Geonames API
- Write countdown function
- Write trip length function
- Integrate WeatherBit API
- Implement logic to determine if current forecast or 10 day forecast is used
- Create POST route to save API data into server
- Integrate Pixabay API
- Write updateUI function
- Style HTML that was added with updateUI function
- Refactor/clean up code
- Implement Jest to test
- Install service workers

## Extended Functionality to Project
The following were added to the project to extend functionality:
- add end date and display length of trip
- instead of pulling a single forecast, pull the forecast for multiple days
- incorporate icons into the forecast 
