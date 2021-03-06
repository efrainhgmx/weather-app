function geolocationSupport() {
    return 'geolocation' in navigator;
};


const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 100_000,

}

export function getCurrentPosition(options = defaultOptions) {
    if(!geolocationSupport()) throw new Error('No hay soporte de geolocalizacion en tu navegador');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            const lat  =  position.coords.latitude;
            const lon  =  position.coords.longitude;
            resolve(position)
            console.log(lat, lon);
        }, () => {
            reject('no obtuvimos tu ubicación')
        }, options);
    });

}

export async function getLatLon(options = defaultOptions) {
   try {
     const { coords: { latitude: lat, longitude: lon } } = await getCurrentPosition(options);
     return { lat, lon, isError: false };
   } catch (error) {
       return { lat: null, long: null, isError: true };
   }
}