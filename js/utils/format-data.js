const defualtDateConfig = {
    day: 'numeric',
    weekday: 'long',
    month: 'long'
}

export function formatDate(date, config = defualtDateConfig) {
   return new Intl.DateTimeFormat('es', config).format(date);
}

export function formatTemp(value) {
    return `${value}°`;

}