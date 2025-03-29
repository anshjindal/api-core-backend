const express = require('express');
const router = express.Router();

// Test route to simulate API failure
router.get('/fail-trainings', async (req, res, next) => {
  try {
    throw new Error("Failed to load trainings");
  } catch (err) {
    err.status = 500;
    next(err); // this will go to errorHandler
  }
});

module.exports = router;
