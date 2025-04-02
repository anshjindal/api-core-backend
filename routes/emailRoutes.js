const express = require("express");
const router = express.Router();
const { sendBulkCertificates } = require("../controllers/emailController");

// POST /api/email/send-certificates
router.post("/send-certificates", sendBulkCertificates);

module.exports = router;
