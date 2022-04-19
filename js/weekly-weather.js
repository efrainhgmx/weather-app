import { getWeeklyWeather } from "./services/weather.js";
import { getLatLon } from "./geolocation.js"
import { formatWeekList } from "./utils/format-data.js";
import { createDOM } from "./utils/dom.js";

function configWeeklyWeather(weeklist) {
 const $container = document.querySelector('.weeklyWeather');

 weeklist.forEach((item) => {
    const $el = createDOM('<h2>hola que ace</h2>')
    $container.append($el); 
 })
}

export default async function weeklyWeather() {
   const { lat, lon , isError } =  await getLatLon();
   if(isError) return console.warn('Paso algo');
   const { isError: weeklyWeatherError,  data: weather } = await getWeeklyWeather(lat, lon);
   if(weeklyWeatherError) return console.warn('Algo esta mal trayendo los dias');
   const weeklist = formatWeekList(weather.list);
   console.log(weeklist);
   configWeeklyWeather(weeklist);
}