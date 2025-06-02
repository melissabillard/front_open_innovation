const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

function configureDBConnection() {
    // Configuration of the MySQL database connection
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: "", // pas de mot de passe
        database: process.env.DB_DATABASE
    });

    return db;
}

module.exports = configureDBConnection;