const API_KEY = "1df0c4f91035547888d7a396d8b9f92f";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeatherForcast = async (cityName = "tokyo") => {
    return await fetch(
      `${BASE_URL}?q=${cityName}&units=metric&appid=${API_KEY}`,
    )
      .then((response) => response.json())
      .catch(() => new Error());
}