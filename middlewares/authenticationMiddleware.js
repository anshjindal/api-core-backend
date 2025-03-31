const jwt = require('jsonwebtoken');

const verifySession = async (req, res, next) => {
  let token = req.cookies.accessToken;

  // Check Authorization header if cookie not found
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = verifiedToken(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = {
  authenticateToken
}; 