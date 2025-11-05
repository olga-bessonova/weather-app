import { input, searchBtn, daySelect, unitToggle } from "./domElements.js";
import { dateFormattedDayLong } from "./utils.js";
import { getCityLocation, getWeather } from "./api.js";
import { weatherHourly } from "./weatherHourly.js";
import { weatherCurrently } from "./weatherCurrently.js";
import { weatherDaily } from "./weatherDaily.js"

let data = null;
let isMetric = true;

async function loadWeather() {
    data = await getWeather();
    const { cityName, country, current, daily, hourly } = data;
    if (current) weatherCurrently(current, daily, cityName, country, isMetric);
    if (daily) weatherDaily(daily, isMetric);

    daySelect.innerHTML = '';
    daily.time.forEach(dateStr => {
        const opt = document.createElement('option');
        opt.value = dateStr;
        opt.textContent = dateFormattedDayLong(dateStr); 
        daySelect.appendChild(opt);
      });

    daySelect.value = daily.time[0];
    weatherHourly(hourly, daySelect.value, isMetric)

    daySelect.addEventListener("change", e => {
        weatherHourly(hourly, e.target.value, isMetric);
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

    function metrics() {
        console.log("isMetric: ", isMetric)
        weatherCurrently(current, daily, cityName, country, isMetric);
        weatherDaily(daily, isMetric);
        const selectedDate = daySelect.value || data.daily.time[0];
        weatherHourly(hourly, selectedDate, isMetric);
    }

    unitToggle.addEventListener("change", () => {
        isMetric = !isMetric;
        metrics();
    })

};

loadWeather();