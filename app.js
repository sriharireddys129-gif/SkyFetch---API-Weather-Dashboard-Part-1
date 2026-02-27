 class WeatherApp {
  constructor() {
    this.API_KEY = "YOUR_API_KEY_HERE";
    this.recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

    this.cityEl = document.getElementById("city");
    this.tempEl = document.getElementById("temperature");
    this.descEl = document.getElementById("description");
    this.iconEl = document.getElementById("icon");

    this.searchInput = document.getElementById("searchInput");
    this.searchBtn = document.getElementById("searchBtn");
    this.recentList = document.getElementById("recentList");
    this.clearBtn = document.getElementById("clearHistory");

    this.init();
  }

  async getWeather(city) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.API_KEY}`;
      const res = await axios.get(url);
      this.displayWeather(res.data);
      this.saveRecentSearch(city);
      localStorage.setItem("lastCity", city);
    } catch {
      alert("City not found");
    }
  }

  displayWeather(data) {
    this.cityEl.textContent = data.name;
    this.tempEl.textContent = `${Math.round(data.main.temp)} °C`;
    this.descEl.textContent = data.weather[0].description;
    this.iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  }

  saveRecentSearch(city) {
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    this.recentSearches = this.recentSearches.filter(c => c !== city);
    this.recentSearches.unshift(city);
    this.recentSearches = this.recentSearches.slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(this.recentSearches));
    this.displayRecentSearches();
  }

  displayRecentSearches() {
    this.recentList.innerHTML = "";
    this.recentSearches.forEach(city => {
      const btn = document.createElement("button");
      btn.textContent = city;
      btn.className = "recent-btn";
      btn.addEventListener("click", () => this.getWeather(city));
      this.recentList.appendChild(btn);
    });
  }

  loadLastCity() {
    const lastCity = localStorage.getItem("lastCity") || "London";
    this.getWeather(lastCity);
  }

  clearHistory() {
    localStorage.clear();
    this.recentSearches = [];
    this.displayRecentSearches();
  }

  init() {
    this.searchBtn.addEventListener("click", () => {
      const city = this.searchInput.value.trim();
      if (city) this.getWeather(city);
    });

    this.clearBtn.addEventListener("click", () => this.clearHistory());
    this.displayRecentSearches();
    this.loadLastCity();
  }
}

new WeatherApp();