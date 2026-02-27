const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.renderLogin);
router.post('/login', authController.postLogin);
router.get('/cadastro', authController.renderCadastro);
router.post('/cadastro', authController.postCadastro);
router.get('/logout', authController.logout);

module.exports = router;
