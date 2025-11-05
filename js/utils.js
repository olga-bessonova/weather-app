export function weatherIcon(code){
    let iconFile = '';

    if (code === 0) iconFile = 'icon-sunny.webp'; // clear sky
    else if (code >= 1 && code <= 2) iconFile = 'icon-partly-cloudy.webp'; // partly cloudy
    else if (code === 3) iconFile = 'icon-overcast.webp'; // partly cloudy
    else if (code === 45 || code === 48) iconFile = 'icon-fog.webp'; // fog
    else if (code >= 51 && code <= 57) iconFile = 'icon-drizzle.webp'; // drizzle
    else if (code >= 61 && code <= 67) iconFile = 'icon-rain.webp'; // drizzle
    else if (code >= 71 && code <= 77) iconFile = 'icon-snow.webp'; // snow
    else if (code >= 80 && code <= 82) iconFile = 'icon-rain.webp'; // rain showers
    else if (code >= 85 && code <= 86) iconFile = 'icon-snow.webp'; // snow showers
    else if (code >= 95 && code <= 99) iconFile = 'icon-storm.webp'; // thunderstorm
    else iconFile = 'icon-error.svg'; // error icon

    return `<img src="./assets/images/${iconFile}" alt="weather icon" class="weather-icon">`;
} 

export function dateFormattedFull(date){
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
};  

export function dateFormattedDayShort(date){
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
    })
};

export function dateFormattedDayLong(dateStr){
    const [y, m, d] = dateStr.split('-');
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    })
};

export function convertTemp(celsius){
    return Math.round(celsius * 9/5 + 32)
};

export function convertSpeed(kmh){
    return Math.round(kmh * 0.621371)
};

export function convertPrecipitation(mm){
    return Math.round(mm * 0.0393701)
};