require("dotenv").config();
const fs = require("fs");
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")
});

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(
            path.join(__dirname, "../../certs/supabase-ca.pem"),
            "utf8"
        )
    }
});


module.exports = pool;