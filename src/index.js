function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[currentDate.getDay()];
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "bb17c4176d4e7b05c02212ee8464ba2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentCityWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityName");
  search(city.value);
}

function showCurrentCityWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let country = document.querySelector("#country");
  country.innerHTML = response.data.sys.country;
  celsiusTemperature = response.data.main.temp;
  let icon = document.querySelector("#weatherIcon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showWeatherOnCurrentLocation(position) {
  let apiKey = "bb17c4176d4e7b05c02212ee8464ba2f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(showCurrentCityWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showWeatherOnCurrentLocation);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function showForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-sm-2">
          <div class="card">
            <div class="card-body">
              <p class="forecast-date" id="forecastDate1">${day}</p>
              <div>
                <img
                  src=""
                  class="fa-solid fa-cloud-sun weather-icons"
                  id="iconForecast1"
                />
              </div>
              <h5 class="forecast-temp" id="forecastTemp1">
                <span class="forecast-temp-max">28° </span
                ><span class="forecast-temp-min">20°</span>
              </h5>
            </div>
          </div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

let currentDate = new Date();
let date = document.querySelector("#date");
date.innerHTML = formatDate(currentDate);

let formCity = document.querySelector("#formCity");
formCity.addEventListener("submit", searchCity);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Kyiv");

showForecast();
