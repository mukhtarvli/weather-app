const pool = require("./config/db");


async function testConnection(){
    
    let client;
    
    try {
        client = await pool.connect();
        console.log("Connected to the database successfully!");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    } finally {
        if (client) {
            client.release();
        } else {
            console.error("Client is not defined. Cannot release the connection.");
        }
        
        await pool.end();
    }
    
}

testConnection();