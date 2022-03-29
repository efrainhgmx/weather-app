export async function getCurrentWeather(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b9326932c9b45182ba6b21f551ccbfed`)
    if(!response.ok) return {
        isError: true,
        data: null
    };

    const data = await response.json();
    return {
        isError: false,
        data
    };
}