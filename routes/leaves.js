const express = require("express");
const router = express.Router();
const leavesController = require("../controllers/leavesController");
const { verifyToken } = require("../middlewares/authenticationMiddleware");

router.post("/:empId", verifyToken, leavesController.saveLeave);
router.put("/:leaveId", verifyToken, leavesController.updateLeave);
router.get("/:empId", verifyToken, leavesController.getAllLeaves);

module.exports = router;
