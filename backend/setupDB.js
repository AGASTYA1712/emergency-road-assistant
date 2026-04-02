require('dotenv').config();
const mysql = require('mysql2/promise');

async function setupDB() {
    try {
        console.log("Connecting to the database...");
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME
        });

        console.log("Connected successfully.");

        console.log("Creating 'targo_users' table...");
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS targo_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Creating 'targo_requests' table...");
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS targo_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                service_type VARCHAR(100) NOT NULL,
                location VARCHAR(255),
                vehicle VARCHAR(255),
                status VARCHAR(50) DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES targo_users(id) ON DELETE CASCADE
            )
        `);

        console.log("Database initialized successfully!");
        await connection.end();
    } catch (err) {
        console.error("Error setting up database:", err);
    }
}

setupDB();
