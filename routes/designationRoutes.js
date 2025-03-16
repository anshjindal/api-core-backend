const express = require("express");
const router = express.Router();
const DesignationController = require("../controllers/designationController");
const verifySession = require("../middlewares/authenticationMiddleware");


router.post("/designationAdd", verifySession, DesignationController.addDesignation);
router.get("/getDesignations", verifySession,DesignationController.getAllDesignations);

module.exports = router;