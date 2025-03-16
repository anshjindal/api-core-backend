const express = require("express");
const router = express.Router();
const DepartmentController = require("../controllers/departmentController");
const verifySession = require("../middlewares/authenticationMiddleware");


router.post("/deptAdd", verifySession, DepartmentController.addDepartment);
router.get("/getDepartments", verifySession,DepartmentController.getAllDepartments);

module.exports = router;