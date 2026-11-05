import { useEffect, useState } from "react";
import { getCities, addCity, deleteCity } from "./services/cityService";
import { getWeather } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cityName, setCityName] = useState("");
    const [weatherData, setWeatherData] = useState([]);
    const [weatherLoading, setWeatherLoading] = useState(true);
    useEffect(() => {
        async function loadInitialData() {
            try {
                // 1. Fetch saved cities from Supabase
                const savedCities = await getCities();

                // 2. Update the cities state
                setCities(savedCities);

                // 3. Fetch weather for all saved cities
                const results = await Promise.allSettled(
                    savedCities.map((city) => getWeather(city.city_name))
                );

                // 4. Keep only successful weather requests
                const successful = results
                    .filter((result) => result.status === "fulfilled")
                    .map((result) => result.value);

                // 5. Update weather state
                setWeatherData(successful);

            } catch (err) {
                console.error(err);
                setError("Failed to load cities");
            } finally {
                setLoading(false);
                setWeatherLoading(false);
            }
        }

        loadInitialData();
    }, []);
    
    async function handleAddCity(e) {
        e.preventDefault();

        if (!cityName.trim()) return;
        
        const cityExists = cities.some(
            (city) =>
                city.city_name.toLowerCase() === cityName.trim().toLowerCase()
        );

        if (cityExists) {
            setError("This city is already in your favorites");
            return;
        }

        try {
            const newCity = await addCity(cityName.trim());

            setCities((prev) => [...prev, newCity]);
            setCityName("");
            setError("");

            try {
                const weather = await getWeather(newCity.city_name);

                setWeatherData((prev) => [...prev, weather]);

            } catch (weatherError) {
                console.error(weatherError);
                setError("City saved, but weather could not be loaded");
            }

        } catch (err) {
            console.error(err);
            setError("Failed to add city");
        }
    }
    
    async function handleDeleteCity(id) {
        try {
            // Delete city from PostgreSQL
            await deleteCity(id);

            // Find the city we deleted
            const deletedCity = cities.find((city) => city.id === id);

            // Remove city from React state
            setCities((prevCities) =>
                prevCities.filter((city) => city.id !== id)
            );

            // Remove its weather card
            if (deletedCity) {
                setWeatherData((prevWeather) =>
                    prevWeather.filter(
                        (weather) =>
                            weather.city.toLowerCase() !==
                            deletedCity.city_name.toLowerCase()
                    )
                );
            }

            setError("");

        } catch (err) {
            console.error(err);
            setError("Failed to delete city");
        }
    }

    return (
        <main>
            <h1>Weather App</h1>
            <h2>My Favorite Cities</h2>
            
            <form className="city-form" onSubmit={handleAddCity}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                />

                <button type="submit">
                    Add City
                </button>
            </form>
            
            <section>
                <h2>Current Weather</h2>

                {weatherData.map((weather, index) => {
                    const city = cities.find(
                        (c) =>
                            c.city_name.toLowerCase() ===
                            weather.city.toLowerCase()
                    );

                    return (
                        <WeatherCard
                            key={`${weather.city}-${weather.country}-${index}`}
                            weather={weather}
                            onDelete={() => {
                                if (city) handleDeleteCity(city.id);
                            }}
                        />
                    );
                })}
            </section>
        </main>
    );
}

export default App;