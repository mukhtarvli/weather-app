const express = require("express");
const { fetchCities, createCity,removeCity  } = require("../controllers/cityController");

const router = express.Router();

router.get("/", fetchCities);
router.post("/", createCity);
router.delete("/:id", removeCity);

module.exports = router;