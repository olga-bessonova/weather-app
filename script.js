async function showWeather() {
    const url ="https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true"

    try {
        const response = await fetch(url);
        // console.log(response)
        const data = await response.json();
        console.log(data);
        document.getElementById("start_section").textContent = JSON.stringify(data, null, 2)
    } catch(error) {
        console.error("Error fetching weather data: ", error)
    }
}
showWeather();