import React from "react";

const Weather = ({ capital, weather }) => {
  const tempInC = (weather.main.temp - 273.15).toFixed(2);
  const icon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  return (
    <>
      <h1>Weather in {capital}</h1>
      <p>Temperature: {tempInC} C</p>
      <img src={icon} alt='weather icon' style={{ width: "25%" }} />
      <p>Wind: {weather.wind.speed} m/s</p>
    </>
  );
};

export default Weather;
