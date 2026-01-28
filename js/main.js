import { input, searchBtn, daySelect, unitToggle, loadingState, dailyLoading, hourlyLoading, errorMessage } from "./domElements.js";
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

function showLoading() {
    if (loadingState) {
        loadingState.classList.remove('hidden');
    }
    
    // Show daily loading
    const dailyContainer = document.getElementById('daily-container');
    if (dailyContainer && !dailyContainer.querySelector('#daily-loading')) {
        const dailyLoadingEl = document.createElement('div');
        dailyLoadingEl.id = 'daily-loading';
        dailyLoadingEl.className = 'section-loading';
        dailyLoadingEl.innerHTML = `
            <img src="./assets/images/icon-loading.svg" alt="Loading" class="loading-icon">
            <p>Loading...</p>
        `;
        dailyContainer.appendChild(dailyLoadingEl);
    } else if (dailyLoading) {
        dailyLoading.classList.remove('hidden');
    }
    
    // Show hourly loading
    const hourlyContainer = document.getElementById('hourly-container');
    if (hourlyContainer && !hourlyContainer.querySelector('#hourly-loading')) {
        const hourlyLoadingEl = document.createElement('div');
        hourlyLoadingEl.id = 'hourly-loading';
        hourlyLoadingEl.className = 'section-loading';
        hourlyLoadingEl.innerHTML = `
            <img src="./assets/images/icon-loading.svg" alt="Loading" class="loading-icon">
            <p>Loading...</p>
        `;
        hourlyContainer.appendChild(hourlyLoadingEl);
    } else if (hourlyLoading) {
        hourlyLoading.classList.remove('hidden');
    }
}

function hideLoading() {
    if (loadingState) {
        loadingState.classList.add('hidden');
    }
    
    // Hide daily loading
    const dailyLoadingEl = document.getElementById('daily-loading');
    if (dailyLoadingEl) {
        dailyLoadingEl.classList.add('hidden');
    }
    
    // Hide hourly loading
    const hourlyLoadingEl = document.getElementById('hourly-loading');
    if (hourlyLoadingEl) {
        hourlyLoadingEl.classList.add('hidden');
    }
}

function showError() {
    if (errorMessage) {
        errorMessage.classList.remove('hidden');
    }
    // Hide weather grid when showing error
    const weatherGrid = document.querySelector('.weather-grid');
    if (weatherGrid) {
        weatherGrid.style.display = 'none';
    }
}

function hideError() {
    if (errorMessage) {
        errorMessage.classList.add('hidden');
    }
}

function updateWeatherDisplay(weatherData, clearInput = false) {
    data = weatherData;
    const { cityName, country, current, daily, hourly } = data;
    
    // Hide error message on successful load
    hideError();
    // Show weather grid only on successful load
    const weatherGrid = document.querySelector('.weather-grid');
    if (weatherGrid) {
        weatherGrid.style.display = '';
    }
    
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
    weatherHourly(hourly, daySelect.value, units);
    
    hideLoading();
    
    // Clear input after data loads if requested
    if (clearInput) {
        // Use setTimeout to ensure it clears after UI updates
        setTimeout(() => {
            const searchInput = document.getElementById('search');
            if (searchInput) {
                searchInput.value = '';
            }
        }, 100);
    }
}

async function loadWeather() {
    showLoading();
    data = await getWeather();
    updateWeatherDisplay(data);

    // Set up day select change handler once
    daySelect.addEventListener("change", e => {
        if (data && data.hourly) {
            weatherHourly(data.hourly, e.target.value, units);
        }
    });

    searchBtn.addEventListener("click", () => {
        const city = input.value.trim();
        if (city) {
            getCityLocation(city, (data) => updateWeatherDisplay(data, true), showLoading, hideLoading, showError, hideError);
        }
    });
    
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const city = input.value.trim();
            if (city) getCityLocation(city, (data) => updateWeatherDisplay(data, true), showLoading, hideLoading, showError, hideError);
        }
    });
      
    function renderWeather() {
        if (!data) return;
        const { cityName, country, current, daily, hourly } = data;
        weatherCurrently(current, daily, cityName, country, units);
        weatherDaily(daily, units);
        weatherHourly(hourly, daySelect.value, units);
    }
      
    const updateToggleState = initUnits((partialUnits, updateToggleFn) => {
        units = { ...units, ...partialUnits };
        renderWeather();
        // Update toggle state after units change
        if (updateToggleFn) {
            updateToggleFn(units);
        }
    });
    
    // Initial toggle state update
    if (updateToggleState) {
        updateToggleState(units);
    }
      

};

loadWeather();