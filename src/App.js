import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState("City");
  const [weather, setWeather] = useState({});
  const api = {
    key : "7eebee56000e7561140131e1ba2507b7",
    endpoint  : "https://api.openweathermap.org/data/2.5/"
  }

  const handleChange = event => {
    if(event.key === "Enter"){
      fetch(`${api.endpoint}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery(query);
          console.log(result);
        });
    }
    else{
      setQuery(event.target.value);
    }
  }
  return (
    <div className="app">
      <input 
      type="text" 
      className="search-box"
      value={query}
      onChange={event => setQuery(event.target.value)}
      onKeyPress={handleChange}
      />
      {(typeof weather.main != "undefined") ? (
        <div className="weather-result">
          <h1>{weather.name}, {weather.sys.country}</h1>
          <h1 className="temperature">{Math.round(weather.main.temp)}°c</h1>
          <h1><i>feels like {Math.round(weather.main.feels_like)}°c</i></h1>
          <h2>Sky Condition : {weather.weather[0].main}</h2>
        </div>
      ) : ('')} 
    </div>
  );
}

export default App;
