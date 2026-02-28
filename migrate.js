const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function runMigration() {
    console.log('--- Iniciando Migração do Banco de Dados Railway ---');

    // Tenta usar a URL completa primeiro, se não usa os dados soltos
    const connectionString = process.env.MYSQL_URL || {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT) || 3306,
        ssl: { rejectUnauthorized: false }
    };

    console.log('Tentando conectar...');

    let connection;
    try {
        connection = await mysql.createConnection(connectionString);
        console.log('✅ Conectado ao MySQL!');

        const sqlPath = path.join(__dirname, 'database.sql');
        let sql = fs.readFileSync(sqlPath, 'utf8');

        // Remover comandos de CREATE/USE DATABASE para evitar conflitos no Railway
        sql = sql.replace(/CREATE DATABASE IF NOT EXISTS.*;/gi, '-- Database creation skipped');
        sql = sql.replace(/USE .*;/gi, '-- Use database skipped');

        // Dividir os comandos por ponto e vírgula e executar um por um
        const commands = sql.split(';').filter(cmd => cmd.trim());

        for (let cmd of commands) {
            if (cmd.trim()) {
                await connection.query(cmd);
                console.log('✔️ Comando executado com sucesso.');
            }
        }

        console.log('\n🚀 TABELAS CRIADAS COM SUCESSO NO RAILWAY!');
        console.log('Agora tente rodar: npm start');

    } catch (error) {
        console.error('\n❌ ERRO NA MIGRAÇÃO:');
        console.error(error.message);
        console.log('\nSe o erro for "Access denied", tente esperar 1 minuto e rode novamente.');
    } finally {
        if (connection) await connection.end();
        process.exit();
    }
}

runMigration();
