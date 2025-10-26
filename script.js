const cityname = document.getElementById("cityname");
const countryname = document.getElementById("country");
const date = document.getElementById("date");
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

    try {
        const response = await fetch(url);
        const data = await response.json();
        const weather = data.current;
        cityname.textContent = cityName;
        countryname.textContent = country;
        
        date.textContent = `Date: ${weather.time}`;
        currTemp.textContent = `Temp: ${weather.temperature_2m}`;
        apparentTemp.textContent = `Feels like: ${weather.apparent_temperature}`;
        humidity.textContent = `Humidity: ${weather.relative_humidity_2m}`;
        wind.textContent = `Wind: ${weather.wind_speed_10m} km/h`;
        precipitation.textContent = `Precipitation: ${weather.precipitation}`;

    } catch(error) {
        console.error("Error fetching weather data: ", error)
    }
}



getWeather();
// add geocoding search city -> coordinates