function WeatherCard({ weather, onDelete }) {
    return (
        <div className="weather-card">
            <h2>{weather.city}, {weather.country}</h2>
            <h1>{weather.temperature}°C</h1>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind Speed: {weather.windSpeed} km/h</p>
            <p>Weather Code: {weather.weatherCode}</p>

            <button type="button" onClick={onDelete}>
                Delete City
            </button>
        </div>
    );
}

export default WeatherCard;