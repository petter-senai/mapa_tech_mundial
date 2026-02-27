#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

(async () => {
  try {
    const { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME } = process.env;
    if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
      console.error('Faltam variáveis de ambiente do banco. Verifique o .env');
      process.exit(1);
    }

    const sqlFile = path.join(__dirname, '..', 'database.sql');
    const raw = fs.readFileSync(sqlFile, 'utf8');

    // divide em statements simples e remove comentários
    const statements = raw
      .replace(/--.*$/gm, '')
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // Cria o banco se não existir (conexão sem database)
    const connNoDb = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      port: DB_PORT || 3306,
      multipleStatements: true
    });

    await connNoDb.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await connNoDb.end();

    // Conecta ao database criado e executa statements (exceto CREATE DATABASE/USE)
    const conn = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: DB_PORT || 3306,
      multipleStatements: true
    });

    for (const stmt of statements) {
      const s = stmt.replace(/\r\n/g, ' ').trim();
      if (/^CREATE\s+DATABASE/i.test(s) || /^USE\s+/i.test(s)) continue;
      console.log('Executando:', s.slice(0, 120));
      await conn.query(s);
    }

    await conn.end();
    console.log('✅ SQL executado com sucesso.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao executar SQL:', err.message);
    process.exit(1);
  }
})();
