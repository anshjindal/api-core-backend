const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is missing',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization format',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("✅ Decoded token:", decoded);
    console.log("✅ Token Header:", req.headers.authorization);

    // ✅ Populate roleRef to get actual role name (like "HR", "ADMIN")
    const user = await Employee.findOne({ empId: decoded.empId })
      .populate("roleRef", "roleName")
      .select("empId email name roleRef");

    if (!user || !user.roleRef?.roleName) {
      return res.status(401).json({ success: false, message: "User not found or missing role" });
    }

    // Attach extracted roleName for access control
    req.user = {
      empId: user.empId,
      email: user.email,
      name: user.name,
      role: user.roleRef.roleName, // 👈 This is now usable in authorize middleware
    };

    console.log("✅ Authenticated User Role:", req.user.role);
    next();
  } catch (error) {
    console.error("❌ Full Authentication error:", error);
    res.status(500).json({
      success: false,
      message: "Server authentication error",
    });
  }
};

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    console.log("✅ Authorization Middleware - User Role:", req.user.role);
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions",
      });
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
