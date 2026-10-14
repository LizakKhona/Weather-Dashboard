import { FaArrowRotateRight } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import s from "./ForecastCardsSection.module.css";
import { Container } from "../Container/Container";
import { useState } from "react";
import {getWeatherForcast} from "../../apiServices/weatherForecast"



export const ForecastCardsSection = ({
  cityForecastData,
  onChange,
  showDetailedInfo,
}) => {
  const [updatedForecast, setUpdatedForecast] = useState(null);

  const date = new Date();

  function getTime(date) {
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const hh = String(hour).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  function getDate(date) {
    const currentDate = String(date.getDate()).padStart(2, "0");
    const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    const currentYear = String(date.getFullYear());
    return `${currentDate}.${currentMonth}.${currentYear}`;
  }

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function getDay(date) {
    const currentDay = daysOfWeek[date.getDay() - 1];
    return currentDay;
  }

  const onTrashBtnClick = (event) => {
    const deleteBtn = event.currentTarget;

    if (deleteBtn) {
      const liItem = deleteBtn.parentNode.parentNode;
      event.currentTarget;

      const cityName = liItem.querySelector("p").textContent;
      console.log(cityName);

      const objectToDelete = cityForecastData.find(
        (object) => object.name === cityName,
      );
      const index = cityForecastData.indexOf(objectToDelete);
      cityForecastData.splice(index, 1);
      liItem.remove();
      console.log(cityForecastData);
    }
  };

  const onUpdateBtnClick = (name) => {
    getWeatherForcast(name).then((response) => setUpdatedForecast(response));
    const objectToUpdate = cityForecastData.find(
      (object) => object.name === name,
    );
    const indexOfObjectToUpdate = cityForecastData.indexOf(objectToUpdate);
    cityForecastData.splice(indexOfObjectToUpdate, 1, objectToUpdate);
  };

  const onCardClick = (name) => {
    showDetailedInfo(name)
  };

  return (
    <section className={s.forecastCardsSection}>
      <Container>
        <ul className={s.cardsList}>
          {cityForecastData.map(({ name, sys, main, weather }) => (
            <li key={name} onClick={() => onCardClick(name)} className={s.card}>
              <div className={s.location}>
                <p className={s.locationCity}>{name}</p>
                <p className={s.locationCountry}>{sys?.country}</p>
              </div>
              <div className={s.forecastDataBox}>
                <span className={s.time}>{getTime(date)}</span>
                <ul className={s.forecastsList}>
                  <li>
                    <button className={s.forecastsBtn} type="button">
                      Hourly forecast
                    </button>
                  </li>
                  <li>
                    <button className={s.forecastsBtn} type="button">
                      Weekly forecast
                    </button>
                  </li>
                </ul>
                <div className={s.box}>
                  <p className={s.date}>{getDate(date)}</p>
                  <p className={s.day}>{getDay(date)}</p>
                </div>
                <img
                  className={s.weatherImg}
                  src={`https://openweathermap.org/payload/api/media/file/${weather[0].icon}.png`}
                  alt="weather icon"
                />
                <span className={s.temperature}>
                  {Math.round(main?.temp)}&#8451;
                </span>
              </div>
              <div className={s.thumb}>
                <ul className={s.buttonsList}>
                  <li>
                    <button
                      onClick={() => onUpdateBtnClick(name)}
                      className={s.button}
                      type="button"
                    >
                      <FaArrowRotateRight className={s.icon} />
                    </button>
                  </li>
                  <li>
                    <button className={s.button} type="button">
                      <FaRegHeart className={s.icon} color={"red"} />
                    </button>
                  </li>
                </ul>
                <button className={s.seeMoreBtn}>See more</button>
                <button onClick={onTrashBtnClick} className={s.button}>
                  <FaRegTrashAlt className={s.icon} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
