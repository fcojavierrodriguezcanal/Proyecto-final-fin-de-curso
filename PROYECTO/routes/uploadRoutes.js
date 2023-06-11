const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// Ruta para mostrar el formulario de subida de archivos
router.get('/', (req, res) => {
  res.render('Form');
});

// Ruta para manejar la subida del archivo
router.post('/', uploadController.uploadFile);

module.exports = router;