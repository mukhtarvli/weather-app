const pool = require("../config/db");

async function getAllCities(){
    const query = "SELECT * FROM favorite_cities";
    const { rows } = await pool.query(query);
    return rows;
}

async function addCity(cityName) {
    const query = `
        INSERT INTO favorite_cities (city_name)
        VALUES ($1)
        RETURNING *
    `;

    const { rows } = await pool.query(query, [cityName]);

    return rows[0];
}


async function deleteCity(id) {
    const query = `
        DELETE FROM favorite_cities
        WHERE id = $1
        RETURNING *
    `;

    const { rows } = await pool.query(query, [id]);

    return rows[0];
}

module.exports = {getAllCities, addCity, deleteCity};