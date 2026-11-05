require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cityRoutes = require("./routes/cityRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/cities", cityRoutes);
app.use("/api/weather", weatherRoutes);

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;