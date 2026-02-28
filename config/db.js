const mysql = require('mysql2');
require('dotenv').config();

// Criar a conexão usando a URL completa (recomendado pelo Railway) ou os parâmetros individuais
const pool = mysql.createPool(process.env.MYSQL_URL || {
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    user: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASS,
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'railway',
    port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    connectTimeout: 20000 // Aumentado para 20 segundos para evitar timeouts no Railway
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
