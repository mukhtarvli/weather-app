import axios from "axios";

const API_URL = "http://localhost:5000/api/cities";

export async function getCities() {
    const response = await axios.get(API_URL);
    return response.data;
}


export async function addCity(cityName) {
    const response =  await axios.post(API_URL, { 
        city_name: cityName });
    return response.data;
}


export async function deleteCity(id) {
    const response = await axios.delete(`${API_URL}/${id}`);

    return response.data;
}
