import { cityname, date, currTemp, apparentTemp, humidity, wind, precipitation } from "./domElements.js";
import { dateFormattedFull } from "./utils.js";

export function weatherCurrently(weather, cityName, country) {
    if (!weather) return;

    cityname.textContent = `${cityName}, ${country}`;
    currTemp.textContent = `${Math.round(weather.temperature_2m)}°`;
    apparentTemp.textContent = `${Math.floor(weather.apparent_temperature)}°`;
    humidity.textContent = `${weather.relative_humidity_2m}`;
    wind.textContent = `${Math.round(weather.wind_speed_10m)} km/h`;
    precipitation.textContent = `${weather.precipitation}`;
    const weatherDate = new Date(weather.time);
    date.textContent = `${dateFormattedFull(weatherDate)}`;

}