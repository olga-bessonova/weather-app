import { cityname, date, currTemp, apparentTemp, humidity, wind, precipitation } from "./domElements.js";
import { dateFormattedFull } from "./utils.js";

export async function getCityLocation(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    console.log("url: ", url);

    try {
        response = await fetch(url);
        data = await response.json();

        if (!data.results || data.results.length === 0) {
            alert("City not found.");
            return;
        }
        const { latitude, longitude, name, country } = data.results[0];

        console.log(`Found: ${name}, ${country}, (${latitude}, ${longitude})`);
        getWeather(latitude, longitude, name, country);
      
    } catch(error){
        console.error("Error fetching city data: ", error)
    }
}


export async function getWeather(lat=52.52, long=13.41, cityName="Berlin", country="Germany") {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto`
    console.log(url)
    try {
        const response = await fetch(url);
        const data = await response.json();
        const weather = data.current;
        cityname.textContent = `${cityName}, ${country}`;
        
        currTemp.textContent = `${Math.round(weather.temperature_2m)}°`;
        apparentTemp.textContent = `${Math.floor(weather.apparent_temperature)}°`;
        humidity.textContent = `${weather.relative_humidity_2m}`;
        wind.textContent = `${Math.round(weather.wind_speed_10m)} km/h`;
        precipitation.textContent = `${weather.precipitation}`;
        const weatherDate = new Date(weather.time);
        date.textContent = `${dateFormattedFull(weatherDate)}`;
    } catch(error) {
        console.error("Error fetching weather data: ", error)
    }
}