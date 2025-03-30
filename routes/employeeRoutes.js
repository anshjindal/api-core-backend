const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const verifySession = require("../middlewares/authenticationMiddleware");

router.post(
  "/assignOffboarding",
  verifySession,
  employeeController.assignOffboardingProcess
);

module.exports = router;
