const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const authController = {
    renderLogin: (req, res) => {
        res.render('login', { error: null });
    },
    renderCadastro: (req, res) => {
        res.render('cadastro', { error: null });
    },
    postCadastro: async (req, res) => {
        const { nome, email, senha } = req.body;
        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.render('cadastro', { error: 'Email já cadastrado' });
            }
            const hashedSenha = await bcrypt.hash(senha, 10);
            await User.create(nome, email, hashedSenha);
            res.redirect('/login');
        } catch (error) {
            console.error('Erro no cadastro:', error);
            res.render('cadastro', { error: 'Erro ao cadastrar' });
        }
    },
    postLogin: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const user = await User.findByEmail(email);
            if (user && await bcrypt.compare(senha, user.senha)) {
                req.session.user = { id: user.id, nome: user.nome };
                res.redirect('/');
            } else {
                res.render('login', { error: 'Email ou senha inválidos' });
            }
        } catch (error) {
            console.error('Erro no login:', error);
            res.render('login', { error: 'Erro ao fazer login' });
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    }
};

module.exports = authController;
