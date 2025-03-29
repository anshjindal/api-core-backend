const EmployeeService = require("../service/employeeService");
const EmployeeRequest = require("../helpers/employeeRequest");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

exports.addEmployee = async (req, res) => {
  upload.any()(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "File upload failed: " + err.message });
    }
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No data received. Ensure you're sending multipart/form-data." });
      }
      let addresses = [];
      try {
        addresses = req.body.addresses ? JSON.parse(req.body.addresses) : [];
      } catch (error) {
        return res.status(400).json({ error: "Invalid addresses format." });
      }

      const employeeData = new EmployeeRequest(req.body);
      employeeData.addresses = addresses;

      const errors = EmployeeRequest.validate(employeeData);
      if (errors) return res.status(400).json({ error: errors });

      const response = await EmployeeService.createEmployee(employeeData, req.files);
      res.status(201).json(response);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Creating employee failed: " + error.message });
    }
  });
};

exports.getAllEmployees = async (req, res) => {
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

exports.updateEmployee = async (req, res) => {
  upload.any()(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "File upload failed: " + err.message });
    }

    try {
      const empId = req.params.empId;

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No data received." });
      }
      let addresses = [];
      try {
        addresses = req.body.addresses ? JSON.parse(req.body.addresses) : [];
      } catch (error) {
        return res.status(400).json({ error: "Invalid addresses format." });
      }
      const updatedData = { ...req.body, addresses };
      const result = await EmployeeService.updateEmployee(empId, updatedData, req.files);
      return res.status(200).json({
        message: "Employee updated successfully",
        updatedEmployee: result,
      });
    } catch (error) {
      console.error("Error Updating Employee:", error.message);
      return res.status(500).json({ error: error.message });
    }
  });
};

exports.getEmployeeById = async (req, res) => {
  try {
    const empId = req.params.empId;
    const empBean = await EmployeeService.getEmployeeById(empId);
    return res.status(200).json({
      message: "Employee retrieved Successfully",
      employee: empBean,
    });
  } catch (error) {
    console.error("Error retrieving Employee:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// 👇 Corrected clearly to use the dedicated service method
exports.assignOffboardingProcess = async (req, res) => {
  try {
    const { empId, offboardingProcessId } = req.body;

    if (!empId || !offboardingProcessId) {
      return res.status(400).json({ message: "empId and offboardingProcessId are required." });
    }

    const updatedEmployee = await EmployeeService.assignOffboardingProcess(empId, offboardingProcessId);

    return res.status(200).json({
      message: "Offboarding process assigned successfully.",
      employee: {
        empId: updatedEmployee.empId,
        offboardingProcessId: updatedEmployee.offboardingProcessId
      }
    });
  } catch (error) {
    console.error("Error assigning offboarding process:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
