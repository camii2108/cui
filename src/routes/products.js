const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer'); // Requiere multer para el manejo de la carga de archivos
/* En este código, hemos agregado un filtro de archivos (fileFilter) para permitir únicamente los archivos con las extensiones JPEG y PNG. Si se intenta subir un archivo con una extensión diferente, se mostrará un mensaje de error. */
const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/images/products');
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname).toLowerCase();
        const fileName = uniqueSuffix + extension;
        cb(null, fileName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/') && (file.mimetype.endsWith('jpeg') || file.mimetype.endsWith('png'))) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
      }
    },
  });
  
const productsController = require('../controllers/productsController');

// Muestra todos los productos
router.get('/', productsController.index);

// Muestra el formulario para crear un nuevo producto
router.get('/create', productsController.create);

// Procesa la solicitud de creación de un nuevo producto
router.post('/', upload.single('image'), productsController.store);

// Muestra los detalles de un producto en particular
router.get('/detail/:id', productsController.detail);

// Muestra el formulario para editar un producto existente
router.get('/edit/:id', productsController.edit);

// Procesa la solicitud de actualización de un producto
router.put('/edit/:id', productsController.update);

// Elimina un producto existente
router.delete('/delete/:id', productsController.destroy);

module.exports = router;
