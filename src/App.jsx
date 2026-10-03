import { useState, useEffect } from 'react'
import './App.css'
import { HeroSection } from './components/HeroSection/HeroSection'
import { ForecastCardsSection } from './components/ForecastCardsSection/ForecastCardsSection'
import {getWeatherForcast} from "./apiServices/weatherForecast"


function App() {
  const [citySearchName, setCitySearchName] = useState()

  const onChange = (searchCityName) => {
    setCitySearchName(searchCityName)

  }

  const [cityForecastData, setCityForecastData] = useState({});
  const normalizedCitySearchName = citySearchName?.toLowerCase();

  useEffect(() => {
    getWeatherForcast(normalizedCitySearchName).then((response) => {
      setCityForecastData(response);
    });
  }, [normalizedCitySearchName]);
  
  

  return (
    <>
      <HeroSection onChange={onChange} />
      <ForecastCardsSection
        cityForecastData={cityForecastData}
      />
    </>
  );
}

export default App
