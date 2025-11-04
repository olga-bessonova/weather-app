import { hourlyContainer, daySelect } from "./domElements.js";
import { weatherIcon, dateFormattedDayLong } from "./utils.js";

export async function weatherHourly(weatherHourly, weatherDaily, dayIndex = 0) {
    const weekDaysDate = weatherDaily.time;
    const weekDays = [];

    for (let i=0; i<weekDaysDate.length; i++){
        let date = new Date(weekDaysDate[i]);
        weekDays.push(dateFormattedDayLong(date));
    }
    console.log(weekDays);

    const selectedDay = new Date(weatherDaily.time[dayIndex]);
    const selectedDateStr = selectedDay.toISOString().split("T")[0];
    const times = weatherHourly.time;

    // Find all hours that belong to that day
    const filteredIndices = times
        .map((t, i) => ({ t, i }))
        .filter(obj => obj.t.startsWith(selectedDateStr))
        .map(obj => obj.i);
        
    const weatherCodes = weatherHourly.weathercode;
    // console.log(weatherCodes.slice(0,24))
    const temperatures = weatherHourly.temperature_2m;

    daySelect.innerHTML = ''; 

    weekDays.forEach((day, i) => {
        const option = document.createElement('option');
        option.value = i; 
        option.textContent = day; 
        daySelect.appendChild(option);
    });
    console.log(daySelect);
    
    hourlyContainer.innerHTML = '';

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
