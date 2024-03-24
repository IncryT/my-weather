import React, { useState, useEffect } from "react";
import './WeatherApp.css';

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  const api_key = "your_api_key";
  const [weatherData, setWeatherData] = useState(null);
  const [currentIcon, setCurrentIcon] = useState(cloud_icon);

  const selectIcon = (iconCode) => {
    // Map icon code to appropriate image path (implement your logic here)
    switch (iconCode) {
      case "01d":
      case "01n":
        return clear_icon;
      case "02d":
      case "02n":
        return cloud_icon;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return drizzle_icon;
      case "09d":
      case "09n":
        return rain_icon;
      case "10d":
      case "10n":
        return rain_icon;
      case "13d":
      case "13n":
        return snow_icon;
      default:
        return clear_icon;
    }
  };

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
      setCurrentIcon(selectIcon(data.weather[0].icon));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    // Code to execute after elements mount (optional, if needed)
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={currentIcon} alt="" />
      </div>
      {weatherData ? (
        <> {/* Render weather data if available */}
          <div className="weather-temp">
            {Math.floor(weatherData?.main?.temp)}°C
          </div>
          <div className="weather-location">{weatherData.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherData?.main?.humidity}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {Math.floor(weatherData?.wind?.speed)} km/h
                </div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default WeatherApp;
