import weather from "../data/current-weather.js";
import { formatDate, formatTemp, sunTimeFormat } from "./utils/format-data.js";
import { weatherConditionsCodes } from "./constants.js";
import { getLatLon } from "./geolocation.js";
import { getCurrentWeather } from "./services/weather.js";

function setCurrentCity($element, city) {
    $element.textContent = city;
}

function setCurrentDate($element) {
    const date = new Date();
    const formattedDate = formatDate(date);
    $element.textContent = formattedDate;
}

function setCurrentTemp($element, temp) {
    $element.textContent = formatTemp(temp);
}


function solarStatus(sunsetTime, sunriseTime) {
    const currentHours = new Date().getHours();
    const sunsetHours = sunsetTime.getHours();
    const sunriseHours = sunriseTime.getHours();

    if(currentHours > sunsetHours || currentHours < sunriseHours) {
        return 'night';
    }

    return 'morning';
}


function setBackground($element, conditionCode, solarStatus) {
    const weatherType = weatherConditionsCodes[conditionCode];
    //For Retina Display devices or 2x pixel density
    const size = (window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches) ? '@2x' : '';
    $element.style.backgroundImage = `url(../images/${solarStatus}-${weatherType}${size}.jpg)`;
}

function configCurrentWeather(weather) {
    //loader
    //current date
    const $currentWeatherDate = document.querySelector('#current-weather-date');
    setCurrentDate($currentWeatherDate);
    //city
    const $currentWeatherCity = document.querySelector('#current-weather-city');
    const city = weather.name;
    setCurrentCity($currentWeatherCity, city);
    //temp
    const $currentWeatherTemp = document.querySelector('#current-weather-temp');
    const temperature = weather.main.temp;
    setCurrentTemp($currentWeatherTemp, temperature);
    //bg need to change like a weather
    const sunriseTime = sunTimeFormat(weather.sys.sunrise);
    const sunsetTime = sunTimeFormat(weather.sys.sunset);
    const $app = document.querySelector('#app');
    const conditionCode = String(weather.weather[0].id).charAt(0);
    setBackground($app, conditionCode,solarStatus(sunsetTime, sunriseTime));
}

export default async function currentWeather() {
   
    const { lat, lon, isError } = await getLatLon();
    (isError) 
        ? console.log("Error al ubicarte")
        : console.log(lat, lon);

    const { data } = await getCurrentWeather(lat, lon);
    console.log(data);
    configCurrentWeather(weather);
    //console.log(weather);
}