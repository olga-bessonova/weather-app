const date = document.getElementById("date")
const currTemp = document.getElementById("curr-temp") 
const apparentTemp = document.getElementById("apparent-temp") 
const humidity = document.getElementById('humidity')
const wind = document.getElementById("wind")
const precipitation = document.getElementById("precipitation")

async function getWeather() {
    const url ="https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m"

    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById("start_section").textContent = JSON.stringify(data, null, 2)
        const weather = data.current
        
        date.textContent = `Date: ${weather.time}`;
        currTemp.textContent = `Temp: ${weather.temperature_2m}`;
        apparentTemp.textContent = `Feels like: ${weather.apparent_temperature}`
        humidity.textContent = `Humidity: ${weather.relative_humidity_2m}`;
        wind.textContent = `Wind: ${weather.wind_speed_10m} km/h`;
        precipitation.textContent = `Precipitation: ${weather.precipitation}`;

    } catch(error) {
        console.error("Error fetching weather data: ", error)
    }
}

getWeather();