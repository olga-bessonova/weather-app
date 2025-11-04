import { input, searchBtn, daySelect } from "./domElements.js";
import { getCityLocation, getWeather } from "./api.js";
import { weatherHourly } from "./weatherHourly.js";
import { weatherCurrently } from "./weatherCurrently.js";
import { weatherDaily } from "./weatherDaily.js"

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

let data = null;

async function loadWeather() {
    const cityName = "Berlin";
    const country = "Germany";
    const data = await getWeather();
    if (data && data.current){
        weatherCurrently(data.current, cityName, country);
    };
    if (data && data.daily){
        weatherDaily(data.daily);
    }
    if (data && data.hourly){
        weatherHourly(data.hourly, data.daily, 0);
    }

    daySelect.addEventListener("change", e => {
      const dayIndex = Number(e.target.value);
      weatherHourly(data.hourly, data.daily, dayIndex);
    });
};
loadWeather();