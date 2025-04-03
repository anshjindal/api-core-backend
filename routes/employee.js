const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authenticationMiddleware');

// Assign Offboarding Process (restricted to HR/Admin roles)
router.post(
  '/assignOffboarding',
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles(['HR', 'Admin']),
  employeeController.assignOffboardingProcess
);

// Existing employee routes (examples for clarity)
router.post('/empAdd', authMiddleware.verifyToken, employeeController.addEmployee);
router.get('/employees', authMiddleware.verifyToken, employeeController.getAllEmployees);
router.get('/:empId', authMiddleware.verifyToken, employeeController.getEmployeeById);
router.put('/:empId', authMiddleware.verifyToken, employeeController.updateEmployee);

module.exports = router;
