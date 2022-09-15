import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";
import LoadingSpinner from "./loading-spinner/LoadingSpinner";

const Country = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  const lat = country.capitalInfo.latlng[0];
  const lng = country.capitalInfo.latlng[1];
  const apiKey = process.env.REACT_APP_API_KEY;

  const renderLanguages = () => {
    const languages = Object.entries(country.languages);
    return languages.map((lang, idx) => {
      return <li key={idx}>{lang[1]}</li>;
    });
  };

  const fetchWeatherData = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`
    );
    setWeatherData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return !isLoading ? (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>{renderLanguages()}</ul>
      <img src={country.flags.png} alt={`the flag of ${country.name.common}`} />
      <Weather capital={country.capital} weather={weatherData} />
    </>
  ) : (
    <div className='mt-5' style={{ textAlign: "center" }}>
      <LoadingSpinner />
    </div>
  );
};

export default Country;
