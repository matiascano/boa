const express = require('express');
const controller = require('../controllers/comercios');

const router = express.Router();

// Obtenemos datos de los comercios para mostrarlos en el index
router.get('/data', controller.getComercios);

// Obtenemos datos de los comercios
router.get('/', controller.getComercios);


// Obtenemos datos de un comercio
router.get('/:id', controller.getComercioById);

// Obtener comercios por user id
router.get('/user/:userId', controller.getComerciosByUserId);


// Obtener comercios por nombre
router.get('/name/:name', controller.getComerciosByName);


// Obtener comercios por slug
router.get('/slug/:slug', controller.getComerciosBySlug);

// Publicar comercio
router.post('/create/', controller.addComercio);

// Actualizar comercio
router.patch('/update/:id', controller.updateComercio);

// Eliminar comercio
router.delete('/delete/:id', controller.deleteComercio);

/*
// Obtener comercios por accesibilidad
router.get('/accessibility/:accessibility', controller.getComerciosByAccessibility);

// Obtener comercios por menú
router.get('/menu/:menu', controller.getComerciosByMenu);

// Obtener comercios por categoría
router.get('/category/:category', controller.getComerciosByCategory);

// Obtener comercios por ciudad
router.get('/city/:city', controller.getComerciosByCity);
*/

module.exports = router;
