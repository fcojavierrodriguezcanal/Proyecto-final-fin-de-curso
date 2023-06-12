const fs = require('fs');
const path = require('path');

exports.renderImageGallery = (req, res, next) => {
  const directory = path.join(__dirname, '..', 'uploads');

  fs.readdir(directory, (err, files) => {
    if (err) {
      // Manejar el error si ocurre
      return next(err);
    }

    const images = files.filter(file => {
      const extension = path.extname(file);
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(extension);
    });

    res.render('image-gallery', { images, basePath: '/uploads' });
  });
};