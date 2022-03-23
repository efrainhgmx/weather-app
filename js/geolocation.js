function geolocationSupport() {
    return 'geolocation' in navigator;
};

export function getCurrentPosition() {
    if(!geolocationSupport()) throw new Error('No hay soporte de geolocalizacion en tu navegador');

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
    })
}