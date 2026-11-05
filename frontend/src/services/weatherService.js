import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/weather`;

export async function getWeather(cityName) {
    const response = await axios.get(
        `${API_URL}/${encodeURIComponent(cityName)}`
    );

    return response.data;
}