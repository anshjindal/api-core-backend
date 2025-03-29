const express = require('express');
const router = express.Router();
const OffboardingProcess = require('../models/OffboardingProcess');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

const verifyHRAdmin = (req, res, next) => {
  const role = req.headers['x-user-role'];
  if (role === 'HR' || role === 'Admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Access denied – HR/Admin only' });
  }
};

router.post('/create', verifyHRAdmin, async (req, res) => {
  try {
    const { title, description, checklist, emailRecipient } = req.body;

    if (!title || !emailRecipient) {
      return res.status(400).json({ message: 'Missing required fields: title or emailRecipient' });
    }

    const newProcess = new OffboardingProcess({
      title,
      description,
      checklist,
      emailRecipient
    });

    const saved = await newProcess.save();

    res.status(201).json({
      message: 'Offboarding process created',
      id: saved._id
    });
  } catch (err) {
    console.error('Error creating offboarding process:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/upload/:processId', verifyHRAdmin, upload.single('file'), async (req, res) => {
  try {
    const processId = req.params.processId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const updated = await OffboardingProcess.findByIdAndUpdate(
      processId,
      { $push: { files: { filename: file.originalname, path: file.path } } },
      { new: true }
    );

    res.status(200).json({
      message: 'File uploaded successfully',
      file: file.originalname,
      process: updated
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during file upload' });
  }
});

module.exports = router;
