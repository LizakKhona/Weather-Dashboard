import { SearchInput } from "./SearchInput";
import {
  heroSection,
  heroTitle,
  text,
  dateNow,
  box,
  thumb,
} from "../HeroSection/HeroSection.module.css";
import { Container } from "../Container/Container";



export const HeroSection = ({setForecast, onChange}) => { 
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const dateTime = new Date();

  const currentDate = {
    year: dateTime.getFullYear(),
    month: months[dateTime.getMonth()],
    date: `${dateTime.getDate()}${dateEnding(dateTime.getDate())}`,
    day: daysOfWeek[dateTime.getDay() - 1],
  };

  const { year, month, date, day } = currentDate  

  function dateEnding(date) {
    switch (date) {
      case 1: 
        return "st"
      case 2: 
        return "nd"
      case 3: 
        return "rd"
      default: 
        return "th"
    }
  }
  
    return (
      <section className={heroSection}>
        <Container>
          <h1 className={heroTitle}>Weather dashboard</h1>
          <div className={box}>
            <div className={thumb}>
              <p className={text}>
                Create your personal list of favorite cities and always be aware
                of the weather.
              </p>
              <p className={dateNow}>{`${month} ${year} ${day}, ${date}`}</p>
            </div>
          </div>
          <SearchInput onChange={onChange} setForecast={setForecast} />
        </Container>
      </section>
    );
}