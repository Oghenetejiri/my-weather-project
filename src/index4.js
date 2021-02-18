let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let h5 = document.querySelector("h5");
h5.innerHTML = `${day} ${hours}:${minutes}`;

function confirmLocation(position) {
  let apiKey = "a6480ded183f36ecfeb2f5aac6fafa9e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let h1 = document.querySelector("#place");
  let h3 = document.querySelector("#actual-temp");
  let celciusTemperature = Math.round(response.data.main.temp);
  let humidityElement= document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let placeElement = document.querySelector("#place");
  let weatherIconElement = document.querySelector("#weather-icon");
  let feelsLikeElement = document.querySelector("#feels-like");

  h1.innerHTML = response.data.name;
  h3.innerHTML = `${celciusTemperature}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  placeElement.innerHTML = response.data.name;
  weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function showCity(event) {
  event.preventDefault();
  let apiKey = "a6480ded183f36ecfeb2f5aac6fafa9e";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(confirmLocation);
}

function convertTempToFahrenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#actual-temp");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function convertTempToCelcius(event){
  event.preventDefault();
  let h3 = document.querySelector("#actual-temp");
  h3.innerHTML = celciusTemperature;
  
}

let celciusTemperature = null;

let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", convertTempToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertTempToCelcius); 

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#location-form");
form.addEventListener("submit", showCity);
