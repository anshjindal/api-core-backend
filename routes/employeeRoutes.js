const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { authenticateToken } = require("../middlewares/authenticationMiddleware"); 
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// employee creation route with file upload
router.post("/empAdd", authenticateToken, upload.any(), employeeController.addEmployee);
router.get("/employees", authenticateToken, employeeController.getAllEmployees);
router.put("/:empId", authenticateToken, upload.any(), employeeController.updateEmployee);
router.get("/:empId", authenticateToken, employeeController.getEmployeeById);

module.exports = router;
