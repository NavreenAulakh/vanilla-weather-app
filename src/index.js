function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {}

function displayTemp(response) {
  let mainTemp = document.querySelector("#main-temp");
  let cityDisplay = document.querySelector("#city-name");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#weather-description");
  let date = document.querySelector("#todays-date");
  let weatherIcon = document.querySelector("#weather-icon");

  tempinCelsius = Math.round(response.data.main.temp);

  mainTemp.innerHTML = Math.round(response.data.main.temp);
  cityDisplay.innerHTML = response.data.name;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  date.innerHTML = formatDate(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}
{
  function searchForCity(city) {
    let cityName = city;
    let cityHeading = document.querySelector("#city-name");
    cityHeading.innerHTML = city;
    let unit = "metric";
    let apiKey = "34ae1065362d42545661451bda2b8a1f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(displayTemp);
    displayForecast();
  }

  function submitCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#input-value");
    let cityName = `${cityInput.value}`;
    searchForCity(cityName);
  }
}

let submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", submitCity);

// Temp conversion

function displayFarenheit() {
  let mainTempDisplay = document.querySelector("#main-temp");
  mainTempDisplay.innerHTML = Math.round(tempinCelsius * 9) / 5 + 32;
  farenheitClick.classList.remove("active");
  celsiusClick.classList.add("active");
}

function displayCelsius() {
  let mainTempDisplay = document.querySelector("#main-temp");
  mainTempDisplay.innerHTML = Math.round(tempinCelsius);
  farenheitClick.classList.add("active");
  celsiusClick.classList.remove("active");
}

let farenheitClick = document.querySelector("#farenheit");
farenheitClick.addEventListener("click", displayFarenheit);

let tempinCelsius = null;
let celsiusClick = document.querySelector("#celsius");
celsiusClick.addEventListener("click", displayCelsius);
