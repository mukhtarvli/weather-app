const express = require("express");
const { fetchWeather } = require("../controllers/weatherController");

const router = express.Router();

router.get("/:cityName", fetchWeather);

module.exports = router;