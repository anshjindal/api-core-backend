const express = require("express");
const router = express.Router();
const leavesController = require("../controllers/leavesController");
const { authenticateToken } = require("../middlewares/authenticationMiddleware");

router.post("/:empId", authenticateToken, leavesController.saveLeave);
router.put("/:leaveId", authenticateToken, leavesController.updateLeave);
router.get("/:empId", authenticateToken, leavesController.getAllLeaves);

module.exports = router;
