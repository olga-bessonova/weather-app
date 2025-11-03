import { dailyContainer } from "./domElements.js";
import { dateFormattedDayShort } from "./utils.js"

export async function weatherDaily(weather){
    const times = weather.time;
    const tempMin = weather.temperature_2m_min;
    const tempMax = weather.temperature_2m_max;
    const weathercode = weather.weathercode;

    // Create an array of daily weather info
    for (let i=0; i<times.length; i++){

        const item = document.createElement("div");
        item.className = 'daily-day-name';
        const weatherIcon = document.createElement("div");
        weatherIcon.className = 'daily-weather-icon';
        
        const temp = document.createElement('div');
        temp.className = 'daily-temp';
        
        const day = new Date(times[i]); 
        item.textContent = dateFormattedDayShort(day);
        
        dailyContainer.appendChild(item);
        dailyContainer.appendChild(weatherIcon);
        dailyContainer.appendChild(temp);
        
    }

}
