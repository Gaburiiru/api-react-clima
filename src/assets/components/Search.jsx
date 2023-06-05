import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../utils/WeatherContext";

function Search() {
  const { weatherData } = useContext(WeatherContext);
  const [searches, setSearches] = useState([]);

  // Agregar un nuevo div al array de búsquedas cada vez que cambie el estado del clima
  useEffect(() => {
    if (weatherData) {
      if (!searches.some((search) => search.name === weatherData.name)) {
        setSearches((prevSearches) => [...prevSearches, weatherData]);
      }
    }
  }, [weatherData]);
  function kelvinToCentigrade(temp) {
    return parseInt(temp - 273.15);
  }
  return (
    <div className="bg-orange-300 p-5 h-auto mx-auto">
      <h2 className="text-3xl text-zinc-50 text-center font-light">
        Búsquedas realizadas anteriormente
      </h2>
      <div className="flex justify-center flex-wrap">
        {searches.length > 0 ? (
          searches.map((search, index) => (
            <div className="bg-orange-400 m-4 w-80 p-5 rounded-xl shadow-2xl" key={index}>
              <h2 className="text-zinc-100 text-center text-xl">
                {search.name}
              </h2>
              <img
                className="mx-auto"
                src={`https://openweathermap.org/img/wn/${search.weather[0].icon}@2x.png`}
                alt="icon"
              />
              <p className="text-white text-5xl text-center font-extrabold font-mono">
                {kelvinToCentigrade(search.main.temp)}°C
              </p>
              <p className="text-white text-md text-center font-sans">
                Max: {kelvinToCentigrade(search.main.temp_max)}
              </p>
              <p className="text-white text-md text-center font-sans">
                Min: {kelvinToCentigrade(search.main.temp_min)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white text-center p-5">
            No se han realizado búsquedas aún.
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;
