const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

const authenticateToken = require("../middlewares/authenticationMiddleware");

router.post("/deptAdd", authenticateToken, departmentController.addDepartment);
router.get(
  "/getDepartments",
  authenticateToken,
  departmentController.getAllDepartments
);

module.exports = router;
