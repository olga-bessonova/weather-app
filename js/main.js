import { input, searchBtn } from "./domElements.js";
import { getCityLocation, getWeather } from "./api.js";
import { hourlyWeather } from "./hourly.js";

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

getWeather();
hourlyWeather();