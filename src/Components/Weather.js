import React, { useState } from 'react';

//setting the api as a variable so its easier to use later
const api = {
  key: "15c4df57e4b67b30dd3dfeb1be4e0aed",
  base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {

  //setting the state for the query and weather
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  //here I fetch the API when enter is pressed and return it as a json promise, and use the result to set the state
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  //This is a basic function to fetch the date and output it on the users screen when they search 
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div data-testid="test-1" className={(typeof weather.main != "undefined") ? ((weather.main.temp > 19) ? 'app warm' : 'app') : 'app'}>    {/*this sets the background image based on the temp, if it is warmer than 19°C it will change to the 'warm background'*/}
      <main>
        <div className="heading">
          Search below for a town or city to see their current weather:
        </div>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder=" Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default Weather;
