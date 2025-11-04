import { hourlyContainer } from "./domElements.js";
import { weatherIcon } from "./utils.js";

export async function weatherHourly(weatherHourly, selectedDateStr) {
    hourlyContainer.innerHTML = '';

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    console.log(todayStr, "todayStr")
    
    const times = weatherHourly.time;
    const weatherCodes = weatherHourly.weathercode;
    const temperatures = weatherHourly.temperature_2m;

    // Find all hours that belong to that day
    let filteredIndices = times
        .map((t, i) => ({ t, i }))
        .filter(obj => obj.t.startsWith(selectedDateStr))
        .map(obj => obj.i);

    // // If selected day is today, remove past hours:
    // if (selectedDateStr === todayStr) {
    //     filteredIndices = filteredIndices.filter(obj => {
    //         const timeUTC = new Date(obj.t);
    //         return timeUTC.getTime() >= now.getTime();
    //     });
    // }
        
    for (let i of filteredIndices) {
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
