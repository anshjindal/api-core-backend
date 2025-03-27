const express = require("express");
const router = express.Router();
const { getEmploymentStatus } = require("../controllers/employmentStatusController");

router.get("/", getEmploymentStatus);

module.exports = router;
