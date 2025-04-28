const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeController");
const verifySession = require("../middlewares/authenticationMiddleware"); 
const multer = require("multer");
const upload = multer({
    limits: { fileSize: 2 * 1024 * 1024 },  // 2MB file size limit
  }).single("profilePicture"); 

// employee creation route
router.post("/empAdd", verifySession, EmployeeController.addEmployee);
router.get("/employees", verifySession,EmployeeController.getAllEmployees);
router.put("/:empId", verifySession,EmployeeController.updateEmployee);
router.get("/:empId",verifySession,EmployeeController.getEmployeeById);
router.post("/:empId/uploadProfilePicture", verifySession, upload, EmployeeController.uploadProfilePicture);
module.exports = router;
