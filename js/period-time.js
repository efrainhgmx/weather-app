import { createDOM } from "./utils/dom.js";

export function periodTimeTemplate() {
    return `
    <li class="dayWeather-item is-selected">
    <span class="dayWeather-time">1 a.&nbsp;m.</span>
    <img class="dayWeather-icon" src="https://openweathermap.org/img/wn/10n@2x.png" alt="moderate" rain="">
    <span class="dayWeather-temp">14°</span>
  </li>`;
}

export function createPeriodTime(weather) {
    return createDOM(periodTimeTemplate())
}