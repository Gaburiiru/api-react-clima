import React, { createContext, useState } from "react";

// Crea el contexto
export const WeatherContext = createContext();

// Crea el proveedor del contexto
export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  // Define las funciones para actualizar el estado del clima
  const updateWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        updateWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};