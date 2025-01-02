// OpenWeatherMap API key
const apiKey = "04a4452186dd9289621eec00e3332871";

// Function to fetch weather data
async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found");
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

// Add event listener to button
document.getElementById("getWeatherBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if (city) {
        fetchWeather(city);
    } else {
        document.getElementById("weather").innerText = "Please enter a city name.";
    }
});
