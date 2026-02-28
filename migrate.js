const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function runMigration() {
    console.log('--- Iniciando Migração do Banco de Dados Railway ---');

    // Dados da conexão
    const config = {
        host: process.env.MYSQLHOST || process.env.DB_HOST,
        user: process.env.MYSQLUSER || process.env.DB_USER,
        password: process.env.MYSQLPASSWORD || process.env.DB_PASS,
        database: process.env.MYSQLDATABASE || process.env.DB_NAME,
        port: parseInt(process.env.MYSQLPORT || process.env.DB_PORT) || 3306,
        ssl: { rejectUnauthorized: false },
        multipleStatements: true // Permite rodar o SQL inteiro de uma vez
    };

    console.log(`Conectando em: ${config.host}:${config.port}...`);

    let connection;
    try {
        connection = await mysql.createConnection(config);
        console.log('✅ Conexão estabelecida com sucesso!');

        const sqlPath = path.join(__dirname, 'database.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Executando arquivo database.sql...');
        await connection.query(sql);

        console.log('🚀 Tabelas criadas com sucesso!');
        console.log('Agora você pode rodar o projeto com "npm start".');

    } catch (error) {
        console.error('❌ Erro durante a migração:');
        console.error(error.message);

        if (error.message.includes('Access denied')) {
            console.log('\n--- DICA DE ACESSO ---');
            console.log('O Railway às vezes bloqueia conexões externas do usuário root logo após criar a senha.');
            console.log('Tente aguardar 2 minutos ou verifique se a porta pública está correta no seu .env.');
        }
    } finally {
        if (connection) await connection.end();
        process.exit();
    }
}

runMigration();
