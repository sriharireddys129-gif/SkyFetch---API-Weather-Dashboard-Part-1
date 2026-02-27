 const API_KEY = "7ecd220fd1113254db674bc0cf6c5984";

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const iconEl = document.getElementById("icon");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loadingEl = document.getElementById("loading");

async function fetchWeather(city) {
  try {
    loadingEl.classList.remove("hidden");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);

    displayWeather(response.data);
  } catch (error) {
    alert("City not found. Please try again.");
  } finally {
    loadingEl.classList.add("hidden");
  }
}

function displayWeather(data) {
  cityEl.textContent = data.name;
  tempEl.textContent = `${Math.round(data.main.temp)} °C`;
  descEl.textContent = data.weather[0].description;
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Search button
searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Initial load
fetchWeather("London");