import axios from "axios";

const API_URL = "http://localhost:5000/api/weather";

export async function getWeather(cityName) {
    const response = await axios.get(
        `${API_URL}/${encodeURIComponent(cityName)}`
    );

    return response.data;
}