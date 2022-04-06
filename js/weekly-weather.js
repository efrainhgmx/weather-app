import { getWeeklyWeather } from "./services/weather.js";
import { getLatLon } from "./geolocation.js"

export default async function weeklyWeather() {
   const { lat, lon , isError } =  await getLatLon();
   if(isError) return console.warn('Paso algo');
   await getWeeklyWeather();
}