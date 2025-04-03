const express = require("express");
const router = express.Router();
const RolesController = require("../controllers/rolesController");
const { verifyToken } = require("../middlewares/authenticationMiddleware");

router.post("/roleAdd", verifyToken, RolesController.addRole);
router.get("/getRoles", verifyToken, RolesController.getAllRoles);

module.exports = router;
