const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    user: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASS,
    database: process.env.MYSQLDATABASE || process.env.DB_NAME,
    port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testar conexão
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Erro de conexão com o MySQL:', err.message);
        console.error('Certifique-se de que o MySQL está rodando e o banco "mapa_tech" foi criado.');
    } else {
        console.log('✅ Conectado ao banco de dados MySQL!');
        connection.release();
    }
});

module.exports = pool.promise();
