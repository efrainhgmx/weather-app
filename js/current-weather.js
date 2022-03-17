import weather from "../data/current-weather.js";
import { formatDate, formatTemp } from "./utils/format-data.js";

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


function solarStatus() {
    return 'night';
}


function setBackground($element, solarStatus) {
    $element.style.backgroundImage = `url(../images/${solarStatus}-clean.jpg)`;
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
    const $app = document.querySelector('#app');
    setBackground($app, solarStatus());
}

export default function currentWeather() {
    configCurrentWeather(weather);
    console.log(weather);
}