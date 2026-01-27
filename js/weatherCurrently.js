import { cityname, date, currTemp, apparentTemp, humidity, wind, precipitation, weatherStatus } from "./domElements.js";
import { dateFormattedFull, weatherIcon, convertTemp, convertSpeed, convertPrecipitation } from "./utils.js";

export function weatherCurrently(weather, dailyWeather, cityName, country, units) {
    if (!weather) return;

    cityname.textContent = `${cityName}, ${country}`;
    
    apparentTemp.textContent = units.temperature === 'celsius' ? `${Math.round(weather.apparent_temperature)}°C` : 
    `${convertTemp(weather.apparent_temperature)}°F`;

    console.log("convertTemp(weather.apparent_temperature) ", convertTemp(weather.apparent_temperature))
    humidity.textContent = `${weather.relative_humidity_2m}%`;

    wind.textContent = units.speed === 'kmh' ? `${Math.round(weather.wind_speed_10m)} km/h` :
    `${convertSpeed(weather.wind_speed_10m)} mph`;

    precipitation.textContent = units.precipitation === 'mm' ? `${Math.round(weather.precipitation)} mm` :
    `${convertPrecipitation(weather.precipitation)} in`;

    const weatherDate = new Date(weather.time);
    date.textContent = `${dateFormattedFull(weatherDate)}`;
    weatherStatus.innerHTML = weatherIcon(dailyWeather.weathercode[0]);
    
    currTemp.textContent = units.temperature === 'celsius' ? `${Math.round(weather.temperature_2m)}°C` : 
    `${convertTemp(weather.temperature_2m)}°F`;
    weatherStatus.append(currTemp);
}