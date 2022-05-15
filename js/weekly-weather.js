import { getWeeklyWeather } from "./services/weather.js";
import { getLatLon } from "./geolocation.js"
import { formatWeekList, formatTemp, formatHumidity, formatWind } from "./utils/format-data.js";
import { createDOM } from "./utils/dom.js";
import { createPeriodTime } from "./period-time.js";
import draggable from "./draggable.js";

function tabPanelTemplate(id) {
   return `<div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
   <div class="dayWeather" id="dayWeather-${id}">
     <ul class="dayWeather-list" id="dayWeather-list-${id}">
         
     </ul>
     </div>
     <div class="dayWeather-summary">
      <p>Máx: <strong class="max">26°</strong></p>
      <p>Min: <strong class="min">15°</strong></p>
      <p>Viento: <strong class="wind">16Km-h</strong></p>
      <p>Humedad <strong class="humidity">63%</strong></p>
     </div>
 </div> `;
}

function createTabPanel(id) {
   const $panel = createDOM(tabPanelTemplate(id));
   if(id > 0) {
      $panel.hidden = true;
   }
   return $panel;
}

function dayWeatherSummary(weeklist, dayTabIndex, timeTabIndex) {
   const weatherData = weeklist[dayTabIndex][timeTabIndex];
   const max = formatTemp(weatherData?.main?.temp_max);
   const min = formatTemp(weatherData?.main?.temp_min);
   const humidity = formatHumidity(weatherData?.main?.humidity);
   const wind = formatWind(weatherData?.wind?.speed);

   console.table(max,min,humidity,wind);
}

function dayTabSelected(weeklist) {
   const tabs = document.querySelectorAll('.dayWeather-item');
   const firstTab = tabs[0];
   let currentIndex = 0;
   let dayIndex = 0;
   firstTab.classList.add('is-selected'); 
   tabs.forEach((element, index) => {
      element.addEventListener("click", () => {
        tabs.forEach((tab) => tab.classList.remove('is-selected'));
        element.classList.add('is-selected');
        currentIndex = index;
        dayIndex = (index > 7) ? Math.floor((index + 1) / 8) : 0;
        dayWeatherSummary(weeklist, dayIndex ,currentIndex);
        console.log(currentIndex);
      });
   })

   dayWeatherSummary(weeklist, dayIndex, currentIndex);
}

function configWeeklyWeather(weeklist) {
 const $container = document.querySelector('.tabs');

 weeklist.forEach((day, index) => {
    const $panel = createTabPanel(index);
    $container.append($panel); 
    day.forEach((weather, indexWeather) => {
         $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather));
    })
 })

 dayTabSelected(weeklist);
}

export default async function weeklyWeather() {
   const $container = document.querySelector('.weeklyWeather')
   const { lat, lon , isError } =  await getLatLon();
   if(isError) return console.warn('Paso algo');
   const { isError: weeklyWeatherError,  data: weather } = await getWeeklyWeather(lat, lon);
   if(weeklyWeatherError) return console.warn('Algo esta mal trayendo los dias');
   const weeklist = formatWeekList(weather.list);
   console.log(weeklist);
   configWeeklyWeather(weeklist);
   draggable($container)
}