const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/medical-records');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-randomstring-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only PDFs and images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|png|jpeg|jpg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
  const mimetype = allowedMimeTypes.includes(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF and image files (PNG, JPG, JPEG) are allowed!'));
  }
};

// Configure multer for medical records
const uploadMedicalRecord = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for medical records
  },
  fileFilter: fileFilter
});

module.exports = uploadMedicalRecord;