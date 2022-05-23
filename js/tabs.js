import {  dayWeatherSummary, defaultWeather } from "./weekly-weather.js";
 
const $tabsCotainer = document.querySelector('#tabs');
const $tabList = $tabsCotainer.querySelectorAll('.tab');
const today = new Date();
let weekday = today.getDay();

const week = [
 'Domingo',
 'Lunes', 
 'Martes', 
 'Miércoles', 
 'Jueves', 
 'Viernes',
 'Sábado'
];

function nextDay(day) {
    return (day === 6 ) ? 0 : day + 1;
}

function newDaySelected(index) {
    const firstItemOfDay = document.querySelectorAll('.dayWeather-item');
    firstItemOfDay[index * 8].classList.add('is-selected');
}

function handleSelectTabClick(event) {
    const $tabSelected = event.target;
    const $tabActive = document.querySelector('.tab[aria-selected="true"');
    $tabActive.removeAttribute('aria-selected');
    $tabSelected.setAttribute('aria-selected', true);

    const id = $tabSelected.id;
    const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`);
    const $tabPanelSelected = document.querySelector('.tabPanel:not([hidden])');
    const tabRefNumber = Number(id.replace("tab-", "")); 
    $tabPanel.hidden = false;
    $tabPanelSelected.hidden = true;
    console.log(id);
    dayWeatherSummary(defaultWeather, tabRefNumber)
    newDaySelected(tabRefNumber);
}

$tabList.forEach(($tab, index) => {
    $tab.addEventListener('click', handleSelectTabClick);
    if(index === 0) {
        $tab.textContent = 'Hoy';
        weekday = nextDay(weekday);
        return;
    }
    $tab.textContent = `${week[weekday]}`;
    weekday = nextDay(weekday);
})