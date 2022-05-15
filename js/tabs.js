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

export function tabSelectedIndex (id) {
    return id ? Number(id.replace("tab-", "")) : 0;
}

function handleSelectTabClick(event) {
    const $tabSelected = event.target;
    const $tabActive = document.querySelector('.tab[aria-selected="true"');
    $tabActive.removeAttribute('aria-selected');
    $tabSelected.setAttribute('aria-selected', true);

    const id = $tabSelected.id;
    const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`);
    const $tabPanelSelected = document.querySelector('.tabPanel:not([hidden])');
    $tabPanel.hidden = false;
    $tabPanelSelected.hidden = true;
    
    tabSelectedIndex(id);
    console.log(id);
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