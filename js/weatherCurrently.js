import { cityname, date, currTemp, apparentTemp, humidity, wind, precipitation, weatherStatus } from "./domElements.js";
import { dateFormattedFull, weatherIcon } from "./utils.js";

export function weatherCurrently(weather, dailyWeather, cityName, country) {
    if (!weather) return;

    cityname.textContent = `${cityName}, ${country}`;
    apparentTemp.textContent = `${Math.floor(weather.apparent_temperature)}°`;
    humidity.textContent = `${weather.relative_humidity_2m}`;
    wind.textContent = `${Math.round(weather.wind_speed_10m)} km/h`;
    precipitation.textContent = `${weather.precipitation}`;
    const weatherDate = new Date(weather.time);
    date.textContent = `${dateFormattedFull(weatherDate)}`;
    const iconImg = weatherIcon(dailyWeather.weathercode[0]);
    weatherStatus.innerHTML = weatherIcon(dailyWeather.weathercode[0]);
    currTemp.textContent = `${Math.round(weather.temperature_2m)}°`;
    weatherStatus.append(currTemp);


}