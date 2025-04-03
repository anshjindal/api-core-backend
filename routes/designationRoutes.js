const express = require("express");
const router = express.Router();
const DesignationController = require("../controllers/designationController");
const { verifyToken } = require("../middlewares/authenticationMiddleware"); 

router.post("/designationAdd", verifyToken, DesignationController.addDesignation);
router.get("/getAllDesignations", verifyToken, DesignationController.getAllDesignations);

module.exports = router;
