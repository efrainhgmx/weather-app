import { getWeeklyWeather } from "./services/weather.js";
import { getLatLon } from "./geolocation.js"
import { formatWeekList } from "./utils/format-data.js";
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
      <p>Máx: <strong>26°</strong></p>
      <p>Min: <strong>15°</strong></p>
      <p>Viento: <strong>16Km-h</strong></p>
      <p>Humedad <strong>63%</strong></p>
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

function dayTabSelected() {
   const tabs = document.querySelectorAll('.dayWeather-item');
   tabs.forEach((element, index) => {
      element.addEventListener("click", () => {
        tabs.forEach((tab) => tab.classList.remove('is-selected'));
        element.classList.add('is-selected');
      });
   })

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

 dayTabSelected();
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