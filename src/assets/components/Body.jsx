import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { WeatherContext } from "../utils/WeatherContext";

export default function Body() {
  const apiKey = "e7a96d4db0d60c5db00fd0be348c2430";
  const { weatherData, updateWeatherData } = useContext(WeatherContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const form = document.getElementById("form");
    const ciudad = document.getElementById("ciudad");
    const pais = document.getElementById("pais");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${ciudad.value},${pais.value}&appid=${apiKey}`
        );
        updateWeatherData(response.data);
        setChecked(true);
      } catch (error) {
        console.error(error);
        setChecked(false);
      }
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      fetchData();
    });
  }, []);

  function kelvinToCentigrade(temp) {
    return parseInt(temp - 273.15);
  }

  return (
    <>
      <div className="bg-orange-400 md:w-96 w-80 h-auto m-4 p-5 mx-auto rounded-xl block shadow-2xl">
        <h1 className="text-white p-1 text-center text-3xl font-thin">
          Buscador de clima
        </h1>
        {weatherData && weatherData.weather && (
          <>
            <img
              className="mx-auto"
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <p className="text-white text-5xl text-center font-extrabold font-mono">
              {kelvinToCentigrade(weatherData.main.temp)}°C
            </p>
            <p className="text-white text-md text-center font-sans">
              Max: {kelvinToCentigrade(weatherData.main.temp_max)}
            </p>
            <p className="text-white text-md text-center font-sans">
              Min: {kelvinToCentigrade(weatherData.main.temp_min)}
            </p>
          </>
        )}
        <form id="form" className="text-center p-2">
          <input
            className="p-1 m-2 w-56 rounded-xl"
            type="text"
            placeholder="Ingrese su ciudad"
            id="ciudad"
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="md:w-7 md:h-8 w-6 h-8 inline"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          {checked ? (
            <p></p>
          ) : (
            <p className="text-red-500">Error al encontrar la ciudad</p>
          )}
          <select className="p-1 m-2 w-64 rounded-xl" id="pais">
            <option disabled value="">
              Selecciona un País
            </option>
            <option value="AR">Argentina</option>
            <option value="US">Estados Unidos</option>
            <option value="MX">México</option>
            <option value="PE">Perú</option>
          </select>
          <br />
          <button
            className="p-1 m-2 bg-slate-800 hover:bg-slate-900 text-white w-64 rounded-md"
            type="submit"
          >
            Buscar
          </button>
        </form>
      </div>
    </>
  );
}