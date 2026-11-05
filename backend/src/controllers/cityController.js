const { getAllCities, addCity, deleteCity } = require("../models/cityModel");
const { getWeather } = require("../services/weatherService");

async function fetchCities(req, res) {
    try {
        const cities = await getAllCities();

        res.status(200).json(cities);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch cities"
        });
    }
}


async function createCity(req, res) {
    try {
        const { city_name } = req.body;

        if (typeof city_name !== "string" || !city_name.trim()) {
            return res.status(400).json({
                message: "A valid city name is required"
            });
        }

        console.log("1. Received city:", city_name);

        try {
            await getWeather(city_name.trim());
            console.log("2. City validation passed");
        } catch (error) {
            console.log("Validation failed:", error.message);

            if (error.message === "City not found") {
                return res.status(400).json({
                    message: "City not found. Please enter a valid city."
                });
            }

            throw error;
        }

        console.log("3. Saving city to PostgreSQL");
        const city = await addCity(city_name.trim());

        return res.status(201).json(city);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to add city"
        });
    }
}


async function removeCity(req, res) {
    try {
        const { id } = req.params;

        const deletedCity = await deleteCity(id);

        if (!deletedCity) {
            return res.status(404).json({
                message: "City not found"
            });
        }

        res.status(200).json({
            message: "City deleted successfully",
            city: deletedCity
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete city"
        });
    }
}

module.exports = { fetchCities, createCity , removeCity };