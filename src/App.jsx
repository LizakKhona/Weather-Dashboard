import { useState, useEffect } from 'react'
import './App.css'
import { HeroSection } from './components/HeroSection/HeroSection'
import { ForecastCardsSection } from './components/ForecastCardsSection/ForecastCardsSection'
import { getWeatherForcast } from "./apiServices/weatherForecast"
import { DetailedForecastSection } from './components/DetailedForecastSection/DetailedForecastSection'



function App() {
  const [citySearchName, setCitySearchName] = useState()

  const onChange = (searchCityName) => setCitySearchName(searchCityName)
  
  const array = localStorage.getItem("forecast");
  const parsedArray1 = JSON.parse(array)
  

  const [cityForecastData, setCityForecastData] = useState(parsedArray1 ?? []);
  // const normalizedCitySearchName = citySearchName?.toLowerCase() ?? "";
  const normalizedCitySearchName = citySearchName?.toLowerCase();
  
  useEffect(() => {
    console.log(parsedArray1);
    // const savedCity = parsedArray1.find(object => object.name.toLowerCase() === normalizedCitySearchName)
    // console.log(savedCity);
    
    // if (savedCity) {
    //   return;
    // } 
    getWeatherForcast(normalizedCitySearchName).then((response) => {
        setCityForecastData([...cityForecastData, response])
        localStorage.setItem(
          "forecast",
          JSON.stringify(cityForecastData)
      );
      // const array = localStorage.getItem("forecast")
      // const parsedArray = JSON.parse(array)
      // console.log(parsedArray);
      
      
      // setCityForecastData(parsedArray);
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
  console.log(detailedCardObject);

  

  return (
    <>
      <HeroSection onChange={onChange} />
      <ForecastCardsSection
        showDetailedInfo={showDetailedInfo}
        onChange={onChange}
        cityForecastData={cityForecastData}
      />
      {isShowCardInfo && <DetailedForecastSection detailedCardObject={detailedCardObject} />}
    </>
  );
}

export default App
