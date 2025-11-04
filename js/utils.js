export function weatherIcon(code){
    if (code === 0) return "☀️";
    if (code >= 1 && code <= 3) return "⛅️"; // Partly cloudy ../assets/images/icon-sunny.webp
    if (code >= 45 && code <= 48) return "🌫"; // Fog icon-fog.webp
    if (code >= 51 && code <= 67) return "🌧"; // Drizzle
    if (code >= 80 && code <= 82) return "🌦"; // Rain showers icon-rain.webp
    if (code >= 95) return "⛈";            // Thunderstorm icon-storm.webp, 
    // icon-overcast, icon-partly-cloudy, icon-snow
    return "❓";
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

export function dateFormattedDayLong(date){
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
    })
};