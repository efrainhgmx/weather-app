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

function handleSelectTabClick(event) {
    const $tabSelected = event.target;
    const id = $tabSelected.id;
    console.log(id);
    const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`);
    $tabPanel.hidden = false;
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