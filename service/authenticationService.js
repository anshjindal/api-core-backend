const bcrypt = require("bcryptjs");
const redisClient = require("../utils/redisConfig");
const Employee = require("../models/employee.js");
const { generateAccessToken, createRefreshToken } = require("../utils/jwtUtility"); 
const { v4: uuidv4 } = require("uuid");
const useragent = require("useragent");
const { getDepartmentName, getDesignationTitle } = require("../service/employeeService.js"); 


const login = async (empId, password, req) => {
  const employeeId = String(empId).trim();
 
  const employee = await Employee.findOne({ empId: employeeId, status: "active" }).populate("roleRef", "roleName").populate("addresses");
  

  if (!employee) throw new Error("No employee exists with this Employee ID");

  const isMatch = await bcrypt.compare(password, employee.password);
  if (!isMatch) throw new Error("Invalid credentials! Please enter valid credentials");

  //Generating the JWT access token
  const userRole = employee.roleRef?.roleName || "Employee"; // Fallback role if missing
  const accessToken = generateAccessToken(empId, userRole);
  

  // First time login using create refresh token for session refresh and all state management
  const { refreshToken, sessionId } = await createRefreshToken(empId); 

  const userAgent = useragent.parse(req.headers["user-agent"]);

  const sessionData = {
    token: refreshToken,
    ip: req.ip,
    browser: userAgent.family,
    os: userAgent.os.family,
    createdAt: new Date().toISOString()
  };

  const tempEmployee = employee.toObject();
  tempEmployee.departmentName= await getDepartmentName(tempEmployee.departmentId);
  tempEmployee.designationName= await getDesignationTitle(tempEmployee.designations);

  try {
    await redisClient.hSet(`session:${empId}:${sessionId}`, sessionData);
    await redisClient.expire(`session:${empId}:${sessionId}`, 7 * 24 * 60 * 60);
  } catch (error) {
    console.error("Error storing session in Redis:", error);
    throw new Error("Internal server error during session management");
  }
  return { accessToken, refreshToken, sessionId, tempEmployee }; 
};

module.exports = { login };

