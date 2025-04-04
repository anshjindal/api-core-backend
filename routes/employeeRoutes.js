const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeController");
const authMiddleware = require("../middlewares/authenticationMiddleware"); 
const upload = require("../middlewares/fileStorageMiddlware");
const {
  verifyToken,
  authenticate,
  authorize,
  authorizeRoles

} = require("../middlewares/authenticationMiddleware");

// Employee creation route
router.post("/empAdd", authMiddleware.verifyToken, EmployeeController.addEmployee);

// Get all employees
router.get("/employees", authMiddleware.verifyToken, EmployeeController.getAllEmployees);

// Update employee by ID
router.put("/:empId", authMiddleware.verifyToken, EmployeeController.updateEmployee);

// Get employee by ID
router.get("/:empId", authMiddleware.verifyToken, EmployeeController.getEmployeeById);

// Assign offboarding process (restricted to HR/Admin roles)
router.post(
  "/assignOffboarding",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles(["HR", "Admin", 'Developer']),
  EmployeeController.assignOffboardingProcess
);

module.exports = router;
