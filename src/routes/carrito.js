const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// Ruta GET para obtener el carrito
router.get('/carrito', carritoController.obtenerCarrito);

// Ruta POST para agregar un producto al carrito
router.post('/carrito/agregar', carritoController.agregarAlCarrito);


// Ruta POST para eliminar un producto del carrito
router.post('/carrito/eliminar', carritoController.eliminarDelCarrito);

// Ruta POST para actualizar la cantidad de un producto en el carrito
router.post('/carrito/actualizar', carritoController.actualizarCantidadEnCarrito);

// Ruta POST para vaciar el carrito
router.post('/carrito/vaciar', carritoController.vaciarCarrito);

module.exports = router;
