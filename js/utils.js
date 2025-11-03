export function weatherIcon(code){
    if (code === 0) return "☀️";
    if (code >= 1 && code <= 3) return "⛅️"; // Partly cloudy
    if (code >= 45 && code <= 48) return "🌫"; // Fog
    if (code >= 51 && code <= 67) return "🌧"; // Drizzle
    if (code >= 80 && code <= 82) return "🌦"; // Rain showers
    if (code >= 95) return "⛈";            // Thunderstorm
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