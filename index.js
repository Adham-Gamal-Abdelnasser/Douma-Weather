// https://api.weatherapi.com/v1/forecast.json?key=09120181217647d3b9754953232711&q=cairo&days=3
let date = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thuresday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let searchInput = document.getElementById("searchInput");
// today catches
let today = document.getElementById("today");
let todayDate = document.getElementById("todayDate");
let currentCity = Array.from(document.querySelectorAll(".currentCity"));
let todayTemp = document.getElementById("todayTemp");
let tempIcon = document.getElementById("tempIcon");
let todayStatus = document.getElementById("todayStatus");
let percentage = document.getElementById("percentage");
let windVelocity = document.getElementById("windVelocity");
let direction = document.getElementById("direction");
let todayIcon = document.getElementById("todayIcon");
let humidity = document.getElementById("humidity");
// next days catches
let nextDay = Array.from(document.querySelectorAll(".nextDay"));
let nextIcon = Array.from(document.querySelectorAll(".nextIcon"));
let nextTemp = Array.from(document.querySelectorAll(".nextTemp"));
let nextStatus = Array.from(document.querySelectorAll(".nextStatus"));

function displayTodayWhether(city, temp, src, Status, h, windV, dir) {
  today.innerHTML = weekDays[date.getDay()];
  todayDate.innerHTML = `${date.getDate()}${months[date.getMonth()]}`;
  for (let i = 0; i < currentCity.length; i++) {
    currentCity[i].innerHTML = city;
  }
  todayTemp.innerHTML = `${temp}<sup>o</sup>c`;
  todayIcon.setAttribute("src", `http:${src}`);
  todayStatus.innerHTML = Status;
  humidity.innerHTML = `<i class="fas fa-umbrella"></i> ${h}%`;
  windVelocity.innerHTML = `<i class="fas fa-wind"></i> ${windV}km/h`;
  direction.innerHTML = `<i class="fas fa-compass"></i> ${dir}`;
}
function displayNextDayWhether(holder) {
  let nextSrc, nTemp;
  for (let i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML =
      weekDays[new Date(holder.forecast.forecastday[i + 1].date).getDay()];
    nextSrc = holder.forecast.forecastday[i + 1].day.condition.icon;
    nTemp = holder.forecast.forecastday[i + 1].day.avgtemp_c;
    nextIcon[i].setAttribute("src", `https:${nextSrc}`);
    nextTemp[i].innerHTML = `${nTemp}<sup>o</sup>c`;
    nextStatus[i].innerHTML =
      holder.forecast.forecastday[i + 1].day.condition.text;
  }
}
async function getWhetherApiData(q) {
  let apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=09120181217647d3b9754953232711&q=${q}&days=3`
  );
  let apiData = await apiResponse.json();
  displayTodayWhether(
    apiData.location.name,
    apiData.current.temp_c,
    apiData.current.condition.icon,
    apiData.current.condition.text,
    apiData.current.humidity,
    apiData.current.wind_kph,
    apiData.current.wind_dir
  );
  displayNextDayWhether(apiData);
}
searchInput.addEventListener("keyup", function () {
  getWhetherApiData(searchInput.value);
});
getWhetherApiData("cairo");
