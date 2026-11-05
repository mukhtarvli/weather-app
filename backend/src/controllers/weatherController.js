const { getWeather } = require("../services/weatherService");

async function fetchWeather(req, res) {
    try {
        const { cityName } = req.params;

        const weather = await getWeather(cityName);

        res.status(200).json(weather);
    } catch (error) {
        console.error(error);

        if (error.message === "City not found") {
            return res.status(404).json({
                message: "City not found"
            });
        }

        res.status(500).json({
            message: "Failed to fetch weather"
        });
    }
}

module.exports = { fetchWeather };