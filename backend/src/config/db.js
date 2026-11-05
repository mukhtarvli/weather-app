const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")
});

const localCertPath = path.resolve(
    __dirname,
    "../../certs/supabase-ca.pem"
);

const caCertificate = process.env.SUPABASE_CA_CERT
    ? process.env.SUPABASE_CA_CERT.replace(/\\n/g, "\n")
    : fs.readFileSync(localCertPath, "utf8");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 2,
    ssl: {
        rejectUnauthorized: true,
        ca: caCertificate
    }
});

module.exports = pool;