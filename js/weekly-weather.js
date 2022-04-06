import { getWeeklyWeather } from "./services/weather.js";
import { getLatLon } from "./geolocation.js"

function configWeeklyWeather(weather) {
    console.log("Nuevo modulo", weather)
}

export default async function weeklyWeather() {
   const { lat, lon , isError } =  await getLatLon();
   if(isError) return console.warn('Paso algo');
   const { isError: weeklyWeatherError,  data: weather } = await getWeeklyWeather(lat, lon);
   if(weeklyWeatherError) return console.warn('Algo esta mal trayendo los dias');
   configWeeklyWeather(weather);
}