const express = require("express");
const router = express.Router();
const leavesController = require("../controllers/leavesController");

router.post("/:empId", leavesController.saveLeave);
router.put("/:empId", leavesController.updateLeave);
router.get("/:empId", leavesController.getAllLeaves);

module.exports = router;
