import { hourlyContainer } from "./domElements.js";
import { weatherIcon } from "./utils.js";

export async function weatherHourly(weather) {
        
    const times = weather.time;
    const weatherCodes = weather.weathercode;
    console.log(weatherCodes.slice(0,24))
    const temperatures = weather.temperature_2m;

    hourlyContainer.innerHTML = '';

    // Create 24 hourly data
    for(let i=0; i<24; i++){
        const time = new Date(times[i]);
        const hourLabel = time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true,
        });
        const weatherCode = weatherCodes[i];
        const weatherLabel = weatherIcon(weatherCode);
        const temperature = Math.round(temperatures[i]);

        const item = document.createElement('div');
        item.className = "hour-item";

        const infoDiv = document.createElement('div');
        infoDiv.className = "hour-info";
        infoDiv.innerHTML = `<span class="span-weather-icon">${weatherLabel}</span><span class="hour-time">${hourLabel}</span>`
        
        const tempDiv = document.createElement('div');
        tempDiv.className = "hour-temp";
        tempDiv.innerHTML = temperature;

        item.appendChild(infoDiv);
        item.appendChild(tempDiv);
        hourlyContainer.appendChild(item);
}}