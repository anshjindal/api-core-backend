const express = require("express");
const router = express.Router();
const DepartmentController = require("../controllers/departmentController");
const { verifyToken } = require("../middlewares/authenticationMiddleware"); 

router.post("/deptAdd", verifyToken, DepartmentController.addDepartment);
router.get("/getDepartments", verifyToken, DepartmentController.getAllDepartments);

module.exports = router;
