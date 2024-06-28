const express = require('express');
const controller = require('../controllers/usuarios');

const router = express.Router();

router.post('/create', controller.addUsuario);
router.patch('/edit/:id', controller.updateUsuario);
router.delete('/delete/:id', controller.deleteUsuario);
router.get('/getById/:id', controller.getUsuarioById);
router.get('/getRoles', controller.getRoles);
router.get('/', controller.getUsuarios);
router.post('/login', controller.login);
module.exports = router;