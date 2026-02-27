const db = require('../config/db');

const User = {
    create: async (nome, email, senha) => {
        const [result] = await db.execute(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );
        return result;
    },
    findByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },
    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    }
};

module.exports = User;
