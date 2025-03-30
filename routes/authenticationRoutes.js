const express = require("express");
const loginModule = require("../controllers/loginController");
const { logoutController } = require("../controllers/logoutController");
//const { verifySession } = require("../middlewares/authenticationMiddleware");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const router = express.Router();

console.log("loginModule:", loginModule);
console.log("loginModule.loginController:", typeof loginModule.loginController);
console.log("loginModule.refreshTokenController:", typeof loginModule.refreshTokenController);

router.post("/authenticate", loginModule.loginController);
router.post("/refresh", loginModule.refreshTokenController);
router.post("/logout", authenticate, logoutController);

module.exports = router;
