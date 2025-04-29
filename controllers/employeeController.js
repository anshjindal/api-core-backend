const EmployeeService = require("../service/employeeService");
const EmployeeRequest = require("../helpers/employeeRequest");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

exports.addEmployee = async (req, res) => {
  upload.any()(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "File upload failed: " + err.message });
    }
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          error: "No data received. Ensure you're sending multipart/form-data.",
        });
      }
      let addresses = [];
      try {
        addresses = req.body.addresses ? JSON.parse(req.body.addresses) : [];
      } catch (error) {
        return res.status(400).json({ error: "Invalid addresses format." });
      }

      const employeeData = new EmployeeRequest(req.body);
      console.log(employeeData);

      // Validating Employee Data
      const errors = EmployeeRequest.validate(employeeData);
      if (errors) return res.status(400).json({ error: errors });

      // sending Employee Data & File Buffer to Service
      const response = await EmployeeService.createEmployee(
        employeeData,
        req.files
      );
      res.status(201).json(response);
    } catch (error) {
      console.error("Error:", error.message);
      res
        .status(500)
        .json({ error: "Creating employee failed: " + error.message });
    }
  });
};

//this handles the get employees request
const getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeService.getAllEmployees();

    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "No employees found." });
    }

    return res.status(200).json({
      message: "Employees retrieved successfully.",
      employees,
    });
  } catch (error) {
    console.error("Error Fetching Employees:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//handles employee update api
const updateEmployee = async (req, res) => {
  try {
    const empId = req.params.empId;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No data received." });
    }

    // Create EmployeeRequest instance with the request body
    const employeeData = new EmployeeRequest(req.body);

    // Validating Employee Data
    const errors = EmployeeRequest.validate(employeeData);
    if (errors) return res.status(400).json({ error: errors });

    const result = await EmployeeService.updateEmployee(
      empId,
      employeeData,
      req.files
    );
    return res.status(200).json({
      message: "Employee updated successfully",
      updatedEmployee: result,
    });
  } catch (error) {
    console.error("Error Updating Employee:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

//getting employee based on employee id
const getEmployeeById = async (req, res) => {
  try {
    const empId = req.params.empId;
    const empBean = await EmployeeService.getEmployeeById(empId);
    return res.status(200).json({
      message: "Employee retrieved Successfully",
      employee: empBean,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllEmployees = getAllEmployees;
exports.updateEmployee = updateEmployee;
exports.getEmployeeById = getEmployeeById;
