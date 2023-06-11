const multer = require('multer');
const path = require('path');

// Configurar el almacenamiento y la validación del archivo
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('El archivo debe ser formato PNG'));
    }
  },
});

// Controlador para manejar la subida de archivos
exports.uploadFile = (req, res, next) => {
  upload.single('archivo')(req, res, (err) => {
    if (err) {
      res.render('upload-error', { error: err.message });
    } else {
      // Procesar el archivo subido según tus necesidades
      res.render('upload-success');
    }
  });
};