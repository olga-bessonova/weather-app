const cityname = document.getElementById("cityname");
const date = document.getElementById("current-date");
const currTemp = document.getElementById("curr-temp"); 
const apparentTemp = document.getElementById("apparent-temp"); 
const humidity = document.getElementById('humidity');
const wind = document.getElementById("wind");
const precipitation = document.getElementById("precipitation");
const input = document.getElementById("search");
const searchBtn = document.getElementById("search-button");
// const form = document.getElementById()

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

function weatherIcon(code){
    if (code === 0) return "☀️";
    if (code >= 1 && code <= 3) return "⛅️"; // Partly cloudy
    if (code >= 45 && code <= 48) return "🌫"; // Fog
    if (code >= 51 && code <= 67) return "🌧"; // Drizzle
    if (code >= 80 && code <= 82) return "🌦"; // Rain showers
    if (code >= 95) return "⛈";            // Thunderstorm
    return "❓";
}
  

async function getCityLocation(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    console.log("url: ", url);

    try {
        response = await fetch(url);
        data = await response.json();

        if (!data.results || data.results.length === 0) {
            alert("City not found.");
            return;
        }
        const { latitude, longitude, name, country } = data.results[0];

        console.log(`Found: ${name}, ${country}, (${latitude}, ${longitude})`);
        getWeather(latitude, longitude, name, country);
        

    } catch(error){
        console.error("Error fetching city data: ", error)
    }
}


async function getWeather(lat=52.52, long=13.41, cityName="Berlin", country="Germany") {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m`
console.log(url)
    try {
        const response = await fetch(url);
        const data = await response.json();
        const weather = data.current;
        cityname.textContent = `${cityName}, ${country}`;
        
        currTemp.textContent = `${Math.round(weather.temperature_2m)}°`;
        apparentTemp.textContent = `${Math.floor(weather.apparent_temperature)}°`;
        humidity.textContent = `${weather.relative_humidity_2m}`;
        wind.textContent = `${Math.round(weather.wind_speed_10m)} km/h`;
        precipitation.textContent = `${weather.precipitation}`;
        const weatherDate = new Date(weather.time);
        dateFormatted = weatherDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        date.textContent = `${dateFormatted}`;
    } catch(error) {
        console.error("Error fetching weather data: ", error)
    }
}

const hourlyContainer = document.getElementById('hourly-container');

async function hourlyWeather() {
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


getWeather();
hourlyWeather();
// make sun image variable according to weather on the current temp container