const { verifiedToken } = require("../utils/jwtUtility");
const redisClient = require("../utils/redisConfig");

const verifySession = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = verifiedToken(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    // Better: instead of keys, use exists (if you structure session keys smartly)
    const sessionKeyPattern = `session:${decoded.empId}:*`;
    const sessions = await redisClient.keys(sessionKeyPattern);

    if (!sessions || sessions.length === 0) {
      return res
        .status(401)
        .json({ message: "Session Expired. Please login again." });
    }

    next();
  } catch (err) {
    console.error("verifySession error:", err.message);
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = verifySession;
