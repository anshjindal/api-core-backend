const jwt = require("jsonwebtoken");

// ✅ 1. Generate Access Token
const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY || "20m",
  });
};

// ✅ 2. Generate Refresh Token
const generateRefreshToken = async (req, res) => {
  try {
    const empId = req.user?.empId || req.body?.empId || "dummy"; // Make sure empId is passed in

    // Generate refresh token with JWT
    const refreshToken = jwt.sign(
      { empId },
      process.env.JWT_REFRESH_SECRET_KEY,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRY || "3d", // Ensure expiration is set
      }
    );

    // Set refreshToken in HTTP cookie (for persistent session)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // Return refreshToken to frontend (for immediate use if needed)
    return { refreshToken };
  } catch (err) {
    // Log error and return failure message
    console.error("Error generating refresh token:", err.message);
    return res.status(500).json({ message: "Failed to generate refresh token" });
  }
};

// ✅ 3. Export both
module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
