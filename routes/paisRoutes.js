const express = require('express');
const router = express.Router();
const paisController = require('../controllers/paisController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', paisController.renderIndex);
router.get('/buscar', paisController.buscarPais);
router.post('/favoritar', authMiddleware, paisController.salvarFavorito);

module.exports = router;
