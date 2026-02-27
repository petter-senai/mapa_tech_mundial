const axios = require('axios');
const Favorito = require('../models/favoritoModel');

const paisController = {
    renderIndex: (req, res) => {
        res.render('index', { user: req.session.user });
    },
    buscarPais: async (req, res) => {
        const { nome } = req.query;
        if (!nome) return res.redirect('/');

        try {
            let response;
            try {
                // Primeira tentativa: Busca pelo nome padrão (funciona para muitos casos em PT-BR também)
                response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(nome)}`);
            } catch (err) {
                // Segunda tentativa: Se falhar, busca especificamente pelo endpoint de tradução
                response = await axios.get(`https://restcountries.com/v3.1/translation/${encodeURIComponent(nome)}`);
            }

            const data = response.data[0];

            // Dicionário simples para tradução de regiões
            const traducaoRegiao = {
                'Africa': 'África',
                'Americas': 'Américas',
                'Asia': 'Ásia',
                'Europe': 'Europa',
                'Oceania': 'Oceania',
                'Antarctic': 'Antártida'
            };

            const pais = {
                nome: data.translations && data.translations.por ? data.translations.por.common : data.name.common,
                capital: data.capital ? data.capital[0] : 'N/A',
                regiao: traducaoRegiao[data.region] || data.region,
                populacao: data.population,
                moeda: data.currencies ? Object.values(data.currencies)[0].name : 'N/A',
                idioma: data.languages ? Object.values(data.languages)[0] : 'N/A',
                bandeira: data.flags.svg
            };

            res.render('pais', { pais, user: req.session.user });
        } catch (error) {
            console.error('Erro na busca do país:', error.message);
            res.render('index', { user: req.session.user, error: 'País não encontrado. Verifique a ortografia e tente novamente.' });
        }
    },
    salvarFavorito: async (req, res) => {
        if (!req.session.user) return res.redirect('/login');

        try {
            const { nome, capital, regiao, populacao, moeda, idioma, bandeira } = req.body;
            await Favorito.add({
                usuario_id: req.session.user.id,
                nome_pais: nome,
                capital,
                regiao,
                populacao,
                moeda,
                idioma,
                bandeira
            });
            res.redirect('/dashboard');
        } catch (error) {
            res.redirect('/');
        }
    }
};

module.exports = paisController;
