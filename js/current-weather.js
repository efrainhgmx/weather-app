import weather from "../data/current-weather.js";

function setCurrentCity($element, city) {
    $element.textContent = city;
}

const config = {
    day: 'numeric',
    weekday: 'long',
    month: 'long'
}

function setCurrentDate($element) {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('es', config).format(date);
    $element.textContent = formattedDate;
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
    //bg need to change like a weather
}

export default function currentWeather() {
    configCurrentWeather(weather);
    console.log(weather);
}