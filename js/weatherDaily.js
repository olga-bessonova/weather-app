import { dailyContainer } from "./domElements.js";
import { dateFormattedDayShort, weatherIcon, convertTemp } from "./utils.js"

export async function weatherDaily(weather, units){
    dailyContainer.innerHTML = '';
    const times = weather.time;
    const tempMin = weather.temperature_2m_min;
    const tempMax = weather.temperature_2m_max;
    const weathercode = weather.weathercode;

    // Create an array of daily weather info
    for (let i=0; i<times.length; i++){

        const item = document.createElement("div");
        item.className = 'daily-item';

        const dayName = document.createElement("div");
        dayName.className = 'daily-day-name';
        const day = new Date(times[i]); 
        dayName.textContent = dateFormattedDayShort(day);

        const weatherImg = document.createElement("div");
        weatherImg.className = 'daily-weather-icon';
        weatherImg.innerHTML = weatherIcon(weathercode[i]);
        
        const temp = document.createElement('div');
        temp.className = 'daily-temp';
        const tempMaxSpan = document.createElement("span");
        const tempMinSpan = document.createElement("span");
        tempMaxSpan.textContent = units.temperature === 'celsius' ? `${Math.round(tempMax[i])}°C` : `${convertTemp(tempMax[i])}°F`;        
        tempMinSpan.textContent = units.temperature === 'celsius' ? `${Math.round(tempMin[i])}°C` : `${convertTemp(tempMin[i])}°F`;        
        temp.appendChild(tempMaxSpan);        
        temp.appendChild(tempMinSpan);        
        
        item.appendChild(dayName);
        item.appendChild(weatherImg);
        item.appendChild(temp);

        dailyContainer.appendChild(item);
        
    }

}
