const mysql = require('mysql2');
require('dotenv').config();

console.log('Connecting with:');
console.log('Host:', process.env.DB_HOST);
console.log('User:', process.env.DB_USER);
console.log('Database:', process.env.DB_NAME);
console.log('Port:', process.env.DB_PORT);
// No log of password for security

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Connection error:', err.message);
    } else {
        console.log('✅ Connected successfully!');
        connection.release();
    }
    process.exit();
});
