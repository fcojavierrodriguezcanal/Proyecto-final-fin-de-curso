const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Ruta para mostrar la galería de imágenes
router.get('/image-gallery', imageController.renderImageGallery);

module.exports = router;