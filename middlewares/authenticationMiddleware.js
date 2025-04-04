const { verifiedToken } = require("../utils/jwtUtility");
const redisClient = require("../utils/redisConfig");
const Employee = require('../models/Employee'); // ✅ Fixed casing here

// Middleware to verify JWT Token and Redis session
const verifyToken = async (req, res, next) => {
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
const authorizeRoles = (allowedRoles) => async (req, res, next) => {
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


// Middleware to authenticate user
const authenticate = async (req, res, next) => {
    try {
        // Check if authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is missing'
            });
        }

        // Extract token (assuming Bearer token)
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Invalid authorization format'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(" Decoded token:", decoded); // Shows payload like empId

        // Find user
        const user = await User.findOne({ empId: decoded.empId }).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        
        console.error('Authentication error:', error);
        res.status(500).json({
            success: false,
            message: 'Server authentication error'
        });
    }
};

// Middleware to authorize roles
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        console.log('Authorization Middleware:', req.user?.role);
        // Ensure user is authenticated first
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        // Check if user's role is in the allowed roles
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions'
            });
        }

        next();
    };
};

module.exports = {
    verifyToken,  // Add this line
    authenticate,
    authorize,
    authorizeRoles
  };
  