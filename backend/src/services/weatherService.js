const axios = require("axios");

async function getCoordinates(cityName) {
    const response = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
            params: {
                name: cityName,
                count: 1,
                language: "en",
                format: "json"
            }
        }
    );

    return response.data.results?.[0] ?? null;
}

async function getWeather(cityName) {
    // Step 1: Get the city's coordinates
    const location = await getCoordinates(cityName);

    if (!location) {
        throw new Error("City not found");
    }

    // Step 2: Request current weather
    const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
            params: {
                latitude: location.latitude,
                longitude: location.longitude,
                current: [
                    "temperature_2m",
                    "relative_humidity_2m",
                    "wind_speed_10m",
                    "weather_code"
                ].join(",")
            }
        }
    );

    // Step 3: Return useful weather information
    return {
        city: location.name,
        country: location.country,
        temperature: response.data.current.temperature_2m,
        humidity: response.data.current.relative_humidity_2m,
        windSpeed: response.data.current.wind_speed_10m,
        weatherCode: response.data.current.weather_code
    };
}

module.exports = { getCoordinates, getWeather };