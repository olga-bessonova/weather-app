import { hourlyContainer } from "./domElements.js";
import { weatherIcon } from "./utils.js";

export async function hourlyWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,weathercode&timezone=auto`
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const times = data.hourly.time;
        const weatherCodes = data.hourly.weathercode;
        console.log(weatherCodes.slice(0,24))
        const temperatures = data.hourly.temperature_2m;
        
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
        }


    } catch(error){
        console.error("Error: couldn't fetch hourly data: ", error)
    }
}