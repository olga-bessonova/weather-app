import { input, searchBtn, daySelect, unitToggle } from "./domElements.js";
import { dateFormattedDayLong } from "./utils.js";
import { getCityLocation, getWeather } from "./api.js";
import { weatherHourly } from "./weatherHourly.js";
import { weatherCurrently } from "./weatherCurrently.js";
import { weatherDaily } from "./weatherDaily.js";
import { initUnits } from "./units.js";

let data = null;
let units = {
    temperature: "celsius",
    speed: "kmh",
    precipitation: "mm"
  };

async function loadWeather() {
    data = await getWeather();
    const { cityName, country, current, daily, hourly } = data;
    if (current) weatherCurrently(current, daily, cityName, country, units);
    if (daily) weatherDaily(daily, units);

    daySelect.innerHTML = '';
    daily.time.forEach(dateStr => {
        const opt = document.createElement('option');
        opt.value = dateStr;
        opt.textContent = dateFormattedDayLong(dateStr); 
        daySelect.appendChild(opt);
      });

    daySelect.value = daily.time[0];
    weatherHourly(hourly, daySelect.value, units)

    daySelect.addEventListener("change", e => {
        weatherHourly(hourly, e.target.value, units);
    });

    searchBtn.addEventListener("click", () => {
        const city = input.value.trim();
        if (city) {
            getCityLocation(city);
        }
    });
    
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const city = input.value.trim();
            if (city) getCityLocation(city);
        }
    });
      
    function renderWeather() {
        weatherCurrently(current, daily, cityName, country, units);
        weatherDaily(daily, units);
        weatherHourly(hourly, daySelect.value, units);
    }
      
    initUnits((partialUnits) => {
        units = { ...units, ...partialUnits };
        renderWeather();
    });
      

};

loadWeather();