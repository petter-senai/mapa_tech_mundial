const Favorito = require('../models/favoritoModel');

const dashboardController = {
    renderDashboard: async (req, res) => {
        try {
            const favoritos = await Favorito.getByUserId(req.session.user.id);
            const stats = await Favorito.getStats(req.session.user.id);
            res.render('dashboard', { user: req.session.user, favoritos, stats });
        } catch (error) {
            res.redirect('/');
        }
    },
    removerFavorito: async (req, res) => {
        try {
            await Favorito.remove(req.body.id, req.session.user.id);
            res.redirect('/dashboard');
        } catch (error) {
            res.redirect('/dashboard');
        }
    }
};

module.exports = dashboardController;
