import weather from "../data/current-weather.js";

function setCurrentCity($element, city) {
    $element.textContent = city;
}

function configCurrentWeather(weather) {
    //loader
    //current date
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