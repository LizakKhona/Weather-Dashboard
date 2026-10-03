import { FaArrowRotateRight } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import s from "./ForecastCardsSection.module.css";
import { Container } from "../Container/Container";
import { getWeatherForcast } from "../../apiServices/weatherForecast";
import { useEffect, useState } from "react";









export const ForecastCardsSection = ({ cityForecastData }) => {
  const iconId = cityForecastData?.weather?.[0].icon || "04d";
  const iconUrl = `https://openweathermap.org/payload/api/media/file/${iconId}.png`;
  const temperature = cityForecastData?.main?.temp || 15;
  console.log(temperature);


  const {name, sys, main}  = cityForecastData;

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

  return (
    <section className={s.forecastCardsSection}>
      <Container>
        <ul className={s.cardsList}>
          <li className={s.card}>
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
              <img className={s.weatherImg} src={iconUrl} alt="weather icon" />
              <span className={s.temperature}>
                {Math.round(main?.temp)}&#8451;
              </span>
            </div>
            <div className={s.thumb}>
              <ul className={s.buttonsList}>
                <li>
                  <button className={s.button} type="button">
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
              <button className={s.button}>
                <FaRegTrashAlt className={s.icon} />
              </button>
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
};
