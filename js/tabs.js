const $tabsCotainer = document.querySelector('#tabs');
const $tabList = $tabsCotainer.querySelectorAll('.tab');
const today = new Date();
let weekday = today.getDay();

const week = ['Domingo',
 'Lunes', 
 'Martes', 
 'Miércoles', 
 'Jueves', 
 'Viernes'
];

function nextDay(day) {
    return day + 1;
}


$tabList.forEach(($tab, index) => {
    $tab.textContent = `${week[weekday]}`;
    weekday = nextDay(weekday);
})