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


$tabList.forEach(($tab, index) => {
    console.log(index);
    if(index === 0) {
        $tab.textContent = 'Hoy';
        weekday = nextDay(weekday);
        return;
    }
    $tab.textContent = `${week[weekday]}`;
    weekday = nextDay(weekday);
})