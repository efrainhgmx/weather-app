const defualtDateConfig = {
    day: 'numeric',
    weekday: 'long',
    month: 'long'
}

export function formatDate(date, config = defualtDateConfig) {
   return new Intl.DateTimeFormat('es', config).format(date);
}

export function formatTemp(value) {
    return `${Math.floor(value)}°`;
}

export function formatHumidity(value) {
    return `${value}%`;
}

export function formatWind(value) {
    return `${Math.floor(value)} Km-h`;
}

export function sunTimeFormat(sunTime) {
    return new Date(sunTime * 1000);
}

export function formatWeekList(rawData) {
    let dayList = [];
    const weeklist = [];
    rawData.forEach((item, index) => {
        dayList.push(item);
        if((index + 1) % 8 === 0) {
            weeklist.push(dayList);
            dayList = []
        } 
    });

    return weeklist;
}

export function currentTimeSelected(index) {
    let indexFormated = 0;
    const number = (Math.floor(index / 8))
    indexFormated = (index - (7 * number)) - number;
    
    return indexFormated;
}