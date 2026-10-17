import { useState, useEffect } from 'react'
import './App.css'
import { HeroSection } from './components/HeroSection/HeroSection'
import { ForecastCardsSection } from './components/ForecastCardsSection/ForecastCardsSection'
import { getWeatherForcast } from "./apiServices/weatherForecast"
import { DetailedForecastSection } from './components/DetailedForecastSection/DetailedForecastSection'

import Gallery from './components/Gallery/Gallery'
import { Header } from './components/Header/Header'


function App() {
  const [citySearchName, setCitySearchName] = useState()

  const onChange = (searchCityName) => setCitySearchName(searchCityName)
  
  const array = localStorage.getItem("forecast");
  const parsedArray1 = JSON.parse(array);


  const [cityForecastData, setCityForecastData] = useState(parsedArray1 ?? []);
  const normalizedCitySearchName = citySearchName?.toLowerCase();
  
  useEffect(() => {
    getWeatherForcast(normalizedCitySearchName).then((response) => {
      setCityForecastData([...cityForecastData, response])
    });
    },
    [normalizedCitySearchName]
  );





  const [detailedCardObject, setDetailedCardObject] = useState();
  const [isShowCardInfo, setIsShowCardInfo] = useState(false);
  const showDetailedInfo = (name) => {
    const object = cityForecastData.find(object => object.name === name)
    setDetailedCardObject(object)
    setIsShowCardInfo(true)  
  }



  return (
    <>
      <Header/>
      <HeroSection onChange={onChange} />
      <ForecastCardsSection
        showDetailedInfo={showDetailedInfo}
        onChange={onChange}
        cityForecastData={cityForecastData}
      />
      {isShowCardInfo && <DetailedForecastSection detailedCardObject={detailedCardObject} />}
      <Gallery />
    </>
  );
}

export default App
