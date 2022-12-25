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
function displayTemp(response) {
  console.log(response.data);

  let mainTemp = document.querySelector("#main-temp");
  let cityDisplay = document.querySelector("#city-name");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#weather-description");
  let date = document.querySelector("#todays-date");
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  cityDisplay.innerHTML = response.data.name;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  date.innerHTML = formatDate(response.data.dt * 1000);
}

let unit = "metric";
let cityName = "Brampton";
//let cityInput = document.querySelector("#city-input");
//let cityName = `${cityInput.value}`;
let apiKey = "34ae1065362d42545661451bda2b8a1f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(displayTemp);
