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

let currentDate = new Date();
let date = document.querySelector("#date");

date.innerHTML = formatDate(currentDate);

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityName").value;
  let apiKey = "bb17c4176d4e7b05c02212ee8464ba2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentCityWeather);
}
let formCity = document.querySelector("#formCity");
formCity.addEventListener("submit", searchCity);

function showCurrentCityWeather(response) {
  console.log(response.data.main.temp);
  console.log(response.data.name);
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
  let icon = document.querySelector("#weatherIcon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data);
}

function showWeatherOnCurrentLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
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

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
