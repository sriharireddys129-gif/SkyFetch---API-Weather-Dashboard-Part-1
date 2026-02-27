const API_KEY = "YOUR_API_KEY_HERE";

// DOM Elements
const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const iconEl = document.getElementById("icon");

// Fetch weather data
function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  axios.get(url)
    .then(response => {
      console.log(response.data);
      displayWeather(response.data);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

// Display weather on UI
function displayWeather(data) {
  cityEl.textContent = data.name;
  tempEl.textContent = `${Math.round(data.main.temp)} °C`;
  descEl.textContent = data.weather[0].description;
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Initial call (hardcoded city)
fetchWeather("London");