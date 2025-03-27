const Employee = require("../models/employee");
const Department = require("../models/department");
const Designation = require("../models/designation");

const getJobInfo = async (req, res) => {
  const empId = req.query.empId;

  if (!empId) {
    return res.status(400).json({ message: "empId is required" });
  }

  try {
    const employee = await Employee.findOne({ empId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const department = await Department.findOne({ departmentId: employee.departmentId });
    const designation = await Designation.findOne({ designationId: employee.designations });

    const jobInfo = {
      empId: employee.empId,
      department: department ? department.departmentName : "N/A",
      designation: designation ? designation.designationName : "N/A"
    };

    res.status(200).json({ message: "Job information retrieved", data: jobInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getJobInfo };
