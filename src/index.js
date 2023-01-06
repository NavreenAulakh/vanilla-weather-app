// Get main time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (hours > 18 || hours < 6) {
    nightmode();
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let forecastDay = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[forecastDay];
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#next-week-weather");
  let forecast = response.data.daily;
  let forecastHTML = '<div class="row">';
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-sm">
          <div class="weather-forecast-date">${formatForecastDay(
            forecastDay.dt
          )}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" class="forecast-icon"/>
          <div class="weather-forecast-temp">
            <span class="forecast-max">${Math.round(
              forecastDay.temp.max
            )}°</span> <span class="forecast-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
          </div>
      </div>

  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  console.log(forecastHTML);
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "34ae1065362d42545661451bda2b8a1f";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let unit = "metric";
  let part = "current,minutely,hourly,alerts";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=0${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}
function displayTemp(response) {
  let mainTemp = document.querySelector(".main-temp");
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

  getForecast(response.data.coord);
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
  }

  function submitCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#input-value");
    let cityName = `${cityInput.value}`;
    searchForCity(cityName);
  }
}

function nightmode() {
  let background = document.querySelector("body");
  background.classList.add("dark-mode");
}

//let submitButton = document.querySelector("#submit-button");
//submitButton.addEventListener("click", submitCity);

let dataEntry = document.querySelector("#input-value");
dataEntry.addEventListener("submit", submitCity);
