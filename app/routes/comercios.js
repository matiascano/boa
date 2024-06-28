const express = require('express');
const controller = require('../controllers/comercios');

const router = express.Router();

// Obtener categorías
router.get('/getCategories', controller.getCategories);

// Obtener accesibilidad
router.get('/getAccessibility', controller.getAccessibility);

// Obtener menús
router.get('/getMenus', controller.getMenus);

// Obtener provincias
router.get('/getProvinces', controller.getProvinces);

// Obtener ciudades por ID de provincia
router.get('/getCities/:province', controller.getCities);

// Ruta de prueba "Hola Mundo"
router.get('/holamundo', controller.holaMundo);

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

module.exports = router;
