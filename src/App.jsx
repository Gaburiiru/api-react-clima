import React from "react";
import { WeatherProvider } from "./assets/utils/WeatherContext";
import Body from "./assets/components/Body";
import Search from './assets/components/Search'

function App() {
  return (
    <WeatherProvider>
      <Body />
      <Search/>
    </WeatherProvider>
  );
}

export default App;

