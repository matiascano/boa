const express = require('express');
const controller = require('../controllers/comercios');

const router = express.Router();

router.get('/buscar', controller.searchComercios)

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

// Obtenemos datos de los comercios para mostrarlos en el index
router.get('/data', controller.getComercios);

// Obtenemos datos de los comercios
router.get('/', controller.getComercios);

// Obtenemos datos de un comercio
router.get('/byId/:id', controller.getComercioById);

//Obtenemos la categoria por id de comercio
router.get('/getCategoriesByCommerce/:id', controller.getCategoriesByCommerce);

//Obtenemos la categoria por id de comercio
router.get('/getCategoriesByCommerce/:id', controller.getCategoriesByCommerce);

// Obtener comercios por user id
router.get('/user/:userId', controller.getComerciosByUserId);

// Obtener comercios por nombre
router.get('/name/:name', controller.getComerciosByName);

// Obtener comercios por slug
router.get('/slug/:slug', controller.getComerciosBySlug);

// Publicar comercio
router.post('/create/', controller.addComercio);

// Eliminar comercio
router.delete('/delete/:id', controller.deleteComercio);

// Actualizar comercio
router.put('/update/:id', controller.updateComercio);

module.exports = router;
