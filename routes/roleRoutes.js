const express = require("express");
const router = express.Router();
const RolesController = require("../controllers/rolesController");
const verifySession = require("../middlewares/authenticationMiddleware");


router.post("/roleAdd", verifySession, RolesController.addRole);
router.get("/getRoles", verifySession,RolesController.getAllRoles);

module.exports = router;