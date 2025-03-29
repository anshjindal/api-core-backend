const express = require("express");
const { loginController, refreshTokenController } = require("../controllers/loginController");
const { logoutController } = require("../controllers/logoutController");
const { verifyToken } = require("../middlewares/authenticationMiddleware");
const router = express.Router();

// Login Routes
router.post("/authenticate", loginController);
router.post("/refresh", refreshTokenController);

// Logout Route requires valid authentication
router.post("/logout", verifyToken, logoutController);

module.exports = router;
