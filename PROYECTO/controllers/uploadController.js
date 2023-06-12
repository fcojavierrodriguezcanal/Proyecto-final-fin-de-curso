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
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('El archivo debe ser formato JPG, PNG o WEBP'));
    }
  },
});

// Controlador para manejar la subida de archivos
exports.uploadFile = (req, res, next) => {
  upload.single('imagen')(req, res, (err) => {
    if (err) {
      res.render('upload-error', { error: err.message });
    } else {
      // Verificar si no se ha seleccionado ningún archivo
      if (!req.file) {
        res.render('upload-error', { error: 'Debe seleccionar un archivo' });
        return;
      }
      
      // Validar la extensión del archivo
      const allowedExtensions = ['.jpg', '.webp', '.png'];
      const fileExtension = path.extname(req.file.originalname);
      if (allowedExtensions.includes(fileExtension)) {
        // Procesar el archivo subido según tus necesidades
        res.render('upload-success');
      } else {
        res.render('upload-error', { error: 'El archivo debe ser formato JPG, WEBP o PNG' });
      }
    }
  });
};