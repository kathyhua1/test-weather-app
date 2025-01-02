// OpenWeatherMap API key
const apiKey = "04a4452186dd9289621eec00e3332871";

// Function to fetch weather data using latitude and longitude
async function fetchWeather(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById("weather").innerText = error.message;
    }
}

// Function to display weather data
function displayWeather(data) {
    const { name, weather, main } = data;
    const weatherInfo = `
        <h2>Weather in ${name}</h2>
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
    document.getElementById("weather").innerHTML = weatherInfo;
}

// Function to fetch coordinates (latitude and longitude) from the city name using Geocoding API
async function fetchCoordinates(city) {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}&limit=1`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Unable to fetch coordinates");
        }

        const data = await response.json();
        if (data.length > 0) {
            const { lat, lon } = data[0]; // Get the first result's coordinates
            fetchWeather(lat, lon); // Now fetch the weather using these coordinates
        } else {
            document.getElementById("weather").innerText = "City not found.";
        }
    } catch (error) {
        document.getElementById("weather").innerText = error.message;
    }
}

// Add event listener to the button
document.getElementById("getWeatherBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if (city) {
        fetchCoordinates(city); // Fetch coordinates first, then fetch weather
    } else {
        document.getElementById("weather").innerText = "Please enter a city name.";
    }
});
