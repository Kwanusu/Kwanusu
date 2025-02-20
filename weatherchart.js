import CONFIG from "./config.js";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${CONFIG.BASE_URL}?q=${location}&appid=${CONFIG.API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather data not found");
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = `📍 ${data.name}, ${data.sys.country}`;
            temperatureElement.textContent = `🌡 ${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = `☁️ ${data.weather[0].description}`;
            
            // Display additional weather properties
            document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;
            document.getElementById("pressure").textContent = `🔴 Pressure: ${data.main.pressure} hPa`;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Failed to retrieve weather data. Check your API key and location.");
        });
}
