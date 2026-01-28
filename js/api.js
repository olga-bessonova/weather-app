import { cityname, date, currTemp, apparentTemp, humidity, wind, precipitation } from "./domElements.js";
import { dateFormattedFull } from "./utils.js";

export async function getCityLocation(city, onWeatherUpdate, showLoadingFn, hideLoadingFn, showErrorFn, hideErrorFn) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    console.log("url: ", url);

    try {
        if (showLoadingFn) showLoadingFn();
        if (hideErrorFn) hideErrorFn();
        
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            if (hideLoadingFn) hideLoadingFn();
            if (showErrorFn) showErrorFn();
            return;
        }
        const { latitude, longitude, name, country } = data.results[0];

        console.log(`Found: ${name}, ${country}, (${latitude}, ${longitude})`);
        const weatherData = await getWeather(latitude, longitude, name, country);
        
        if (weatherData && onWeatherUpdate) {
            onWeatherUpdate(weatherData);
        } else if (hideLoadingFn) {
            hideLoadingFn();
        }
      
    } catch(error){
        console.error("Error fetching city data: ", error)
        if (hideLoadingFn) hideLoadingFn();
        if (showErrorFn) showErrorFn();
    }
}

export async function getWeather(lat=52.52, long=13.41, cityName="Berlin", country="Germany") {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto`
    console.log(url)
    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            cityName,
            country,
            current: data.current,
            daily: data.daily,
            hourly: data.hourly,
        };
    } catch(error) {
        console.error("Error fetching weather data: ", error)
    }
}