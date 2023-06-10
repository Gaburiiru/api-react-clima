import React, { createContext, useState } from "react";

// Crea el contexto
export const WeatherContext = createContext();
export const ThemeContext = createContext("light");

// Crea el proveedor del contexto
export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [theme, setTheme] = useState("light");

  // Define las funciones para actualizar el estado del clima
  const updateWeatherData = (data) => {
    setWeatherData(data);
  };

  function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-bg-body");

    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <div
          className={`${
            theme === "dark" ? "dark-bg" : "light-bg"
          } p-5 mx-auto flex justify-center items-center`}
        >
          <h1 className="text-white p-1 text-center text-3xl font-serif font-extralight">
            Buscador de clima
          </h1>
          <button
            className="bg-zinc-600 w-9 h-9  rounded-3xl ml-2"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>

        <WeatherContext.Provider
          value={{
            weatherData,
            updateWeatherData,
          }}
        >
          {children}
        </WeatherContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};
