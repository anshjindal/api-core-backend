const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// ✅ Route to generate a test token
router.get('/generate-token', (req, res) => {
  const payload = { empId: "EMPLOYEE00001" }; // Make sure this user exists in DB
  console.log("🧠Generating token with payload:", payload);

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
