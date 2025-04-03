const { verifiedToken } = require("../utils/jwtUtility");
const redisClient = require("../utils/redisConfig");
const Employee = require('../models/Employee'); // ✅ Fixed casing here

// Middleware to verify JWT Token and Redis session
exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decoded = verifiedToken(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    // Check Redis session validity
    const sessions = await redisClient.keys(`session:${decoded.empId}:*`);
    if (sessions.length === 0) {
      return res.status(401).json({ message: "Session Expired. Please login again." });
    }

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(403).json({ message: "Invalid Token" });
  }
};

// Middleware to authorize user roles (e.g., HR, Admin)
exports.authorizeRoles = (allowedRoles) => async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ empId: req.user.empId }).populate('roleRef');

    if (!employee || !allowedRoles.includes(employee.roleRef.roleName)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
    }

    next();
  } catch (error) {
    console.error("Role authorization error:", error.message);
    return res.status(500).json({ message: 'Authorization error.' });
  }
};
