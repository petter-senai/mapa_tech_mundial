const db = require('../config/db');

const Favorito = {
    add: async (data) => {
        const { usuario_id, nome_pais, capital, regiao, populacao, moeda, idioma, bandeira } = data;
        const [result] = await db.execute(
            'INSERT INTO favoritos (usuario_id, nome_pais, capital, regiao, populacao, moeda, idioma, bandeira) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [usuario_id, nome_pais, capital, regiao, populacao, moeda, idioma, bandeira]
        );
        return result;
    },
    getByUserId: async (usuario_id) => {
        const [rows] = await db.execute('SELECT * FROM favoritos WHERE usuario_id = ?', [usuario_id]);
        return rows;
    },
    remove: async (id, usuario_id) => {
        const [result] = await db.execute('DELETE FROM favoritos WHERE id = ? AND usuario_id = ?', [id, usuario_id]);
        return result;
    },
    getStats: async (usuario_id) => {
        const [totalRows] = await db.execute('SELECT COUNT(*) as total FROM favoritos WHERE usuario_id = ?', [usuario_id]);
        const [regiaoRows] = await db.execute(
            'SELECT regiao, COUNT(*) as count FROM favoritos WHERE usuario_id = ? GROUP BY regiao ORDER BY count DESC LIMIT 1',
            [usuario_id]
        );
        return {
            total: totalRows[0].total,
            mostExploredRegion: regiaoRows[0] ? regiaoRows[0].regiao : 'Nenhuma'
        };
    }
};

module.exports = Favorito;
