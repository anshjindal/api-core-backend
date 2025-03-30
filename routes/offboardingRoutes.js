const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const path = require('path');
const multer = require('multer');
const offboardingController = require('../controllers/offboardingController');
const { authenticate, authorize } = require('../middlewares/authenticationMiddleware');


// 🔒 Validation rules for /create endpoint
const createValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('emailRecipient').isEmail().withMessage('Valid email required'),
  body('checklist').isArray({ min: 1 }).withMessage('Checklist must be a non-empty array'),
];

// ✅ Create offboarding process (HR/Admin)
router.post(
  '/create',
  authenticate,
  authorize('HR', 'ADMIN', 'Developer'),
  createValidation,
  offboardingController.createOffboardingProcess
);


// ✅ Multer config for uploading PPTs only
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const pptFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.ppt' || ext === '.pptx') {
    cb(null, true);
  } else {
    cb(new Error('Only PPT or PPTX files are allowed'));
  }
};

const upload = multer({ storage, fileFilter: pptFileFilter });


// ✅ Upload dummy PPT file (HR/Admin)
router.post(
  '/upload',
  authenticate,
  authorize('HR', 'ADMIN', 'Developer'),
  upload.single('file'),
  (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    res.status(200).json({
      message: 'PPT file uploaded successfully',
      filename: req.file.filename,
      originalname: req.file.originalname,
    });
  }
);

module.exports = router;
