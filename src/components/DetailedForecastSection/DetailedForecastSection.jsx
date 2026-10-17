import { Container } from "../Container/Container"
import s from "./DetailedForecastSection.module.css"

export const DetailedForecastSection = ({ detailedCardObject }) => {
  const { main, wind, weather } = detailedCardObject
  

  return (
    <section className={s.detailedForecastSection}>
      <Container>
        <ul className={s.detailedForecastList}>
          <li className={s.detailedForecastItem}>
            <p className={s.measurements}>Feels like</p>
            <p className={s.measurementsValue}>{main.feels_like}℃</p>
            <div className={`${s.image} ${s.tempImage}`}></div>
          </li>
          <li className={`${s.detailedForecastItem} ${s.minMaxTempItem}`}>
            <div className={s.thumb}>
              <p className={s.measurements}>Min ℃</p>
              <p className={s.measurementsValue}>{main.temp_min}℃</p>
            </div>
            <div className={s.thumb}>
              <p className={s.measurements}>Max ℃</p>
              <p className={s.measurementsValue}>{main.temp_max}℃</p>
            </div>
          </li>
          <li className={s.detailedForecastItem}>
            <p className={s.measurements}>Humidity</p>
            <p className={s.measurementsValue}>{main.humidity}%</p>
            <div className={`${s.image} ${s.humidityImage}`}></div>
          </li>
          <li className={s.detailedForecastItem}>
            <p className={s.measurements}>Pressure</p>
            <p className={s.measurementsValue}>{main.pressure} Pa</p>
            <div className={`${s.image} ${s.pressureImage}`}></div>
          </li>
          <li className={s.detailedForecastItem}>
            <p className={s.measurements}>Wind speed</p>
            <p className={s.measurementsValue}>{wind.speed} m/s</p>
            <div className={`${s.image} ${s.windImage}`}></div>
          </li>
          <li className={s.detailedForecastItem}>
            <p className={s.measurements}>Visibility</p>
            <p className={s.measurementsValue}>{weather[0].main}</p>
            <div className={`${s.image} ${s.visibilityImage}`}></div>
          </li>
        </ul>
      </Container>
    </section>
  );
};