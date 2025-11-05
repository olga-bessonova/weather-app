import { cityname, date, currTemp, apparentTemp, humidity, wind, precipitation, weatherStatus } from "./domElements.js";
import { dateFormattedFull, weatherIcon, convertTemp, convertSpeed, convertPrecipitation } from "./utils.js";

export function weatherCurrently(weather, dailyWeather, cityName, country, isMetric = true) {
    if (!weather) return;

    cityname.textContent = `${cityName}, ${country}`;
    
    apparentTemp.textContent = isMetric ? `${Math.round(weather.apparent_temperature)}°` : 
    `${convertTemp(weather.apparent_temperature)}°`;

    console.log("convertTemp(weather.apparent_temperature) ", convertTemp(weather.apparent_temperature))
    humidity.textContent = `${weather.relative_humidity_2m}%`;

    wind.textContent = isMetric ? `${Math.round(weather.wind_speed_10m)} km/h` :
    `${convertSpeed(weather.wind_speed_10m)} m/h`;

    precipitation.textContent = isMetric ? `${weather.precipitation} mm` :
    `${convertPrecipitation(weather.precipitation)} in`;
    
    const weatherDate = new Date(weather.time);
    date.textContent = `${dateFormattedFull(weatherDate)}`;
    weatherStatus.innerHTML = weatherIcon(dailyWeather.weathercode[0]);
    
    currTemp.textContent = isMetric ? `${Math.round(weather.temperature_2m)}°` : 
    `${convertTemp(weather.temperature_2m)}°`;
    weatherStatus.append(currTemp);


}