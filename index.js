// https://api.weatherapi.com/v1/forecast.json?key=09120181217647d3b9754953232711&q=cairo&days=3
let date = new Date();
let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thuresday","Friday","Saturday",];
let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let hours = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00",]
let searchInput = document.getElementById("searchInput");
// today catches
let cities = Array.from(document.querySelectorAll(".city"));
// next days catches
let nextDay = Array.from(document.querySelectorAll(".nextDay"));
let days = Array.from(document.querySelectorAll(".days"));
let dates = Array.from(document.querySelectorAll(".dates"));
let temps = Array.from(document.querySelectorAll(".temp"));
let icons = Array.from(document.querySelectorAll(".icon"));
let statuss = Array.from(document.querySelectorAll(".statue"));
let forecastHours = Array.from(document.querySelectorAll(".forecastHours"));
let humidityContainer = Array.from(document.querySelectorAll(".humidity"));
let windVelocityContainer = Array.from(document.querySelectorAll(".windVelocity"));
let directionContainer = Array.from(document.querySelectorAll(".direction"));

function displayDayWeather(api) {
  let forecastdays = api.forecast.forecastday
  for (let i = 0; i < forecastdays.length; i++) {
    days[i].innerHTML=weekDays[new Date(forecastdays[i].date).getDay()]
    dates[i].innerHTML=`${new Date(forecastdays[i].date).getDate()}${months[date.getMonth()]}`
    cities.map(c=>c.innerHTML=api.location.name)
    temps[i].innerHTML=`${forecastdays[i].day.avgtemp_c}<sup>o</sup>c`
    icons[i].setAttribute("src",`https:${forecastdays[i].day.condition.icon}`)
    statuss[i].innerHTML=forecastdays[i].day.condition.text
    let hourBox=``
    for (let j = 0; j < forecastdays[i].hour.length; j++) {
      hourBox+=`
          <div class="single-hour px-3 py-1 rounded-2 text-center">
                    <p class="text-white my-0">${hours[j]}</p>
                    <div class="hour-contain my-0">
                      <img class="w-100" src="http:${forecastdays[i].hour[j].condition.icon}"/>
                    </div>
                    <p class="  my-0 fs-4 text-info">${forecastdays[i].hour[j].condition.text}</p>
                    <p class="text-white fs-3 mb-0">${forecastdays[i].hour[j].temp_c}</p>
                  </div>
      `
    }
    forecastHours[i].innerHTML=hourBox
    humidityContainer[i].innerHTML=`<i class="fas fa-umbrella"></i> ${forecastdays[i].day.avghumidity}%`
    windVelocityContainer[i].innerHTML=`<i class="fas fa-wind"></i> ${forecastdays[i].day.maxwind_kph}%`
  }
}
async function getWhetherApiData(q) {
  let apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=09120181217647d3b9754953232711&q=${q}&days=3`
  );
  let apiData = await apiResponse.json();
  displayDayWeather(apiData)
}
searchInput.addEventListener("keyup", function () {
  getWhetherApiData(searchInput.value);
});
getWhetherApiData("cairo");
