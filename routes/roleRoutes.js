const express = require("express");
const router = express.Router();
const roleController = require("../controllers/rolesController");
const authenticateToken = require("../middlewares/authenticationMiddleware");

router.post("/roleAdd", authenticateToken, roleController.addRole);
router.get("/getRoles", authenticateToken, roleController.getAllRoles);

module.exports = router;
