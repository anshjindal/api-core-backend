const { login } = require("../service/authenticationService");
const EmployeeResponse = require("../helpers/employeeResponse");
const { generateRefreshToken } = require("../utils/jwtUtility");


const loginController = async (req, res) => {
  try {
    if (!req.body || !req.body.empId || !req.body.password) {
      return res.status(400).json({ 
        success: false,
        message: "empId and password are required" 
      });
    }

    const { empId, password } = req.body;
    const { accessToken, refreshToken, sessionId, tempEmployee} = await login(empId, password, req);
    const empBean = EmployeeResponse.fromEntity(tempEmployee);

    // Cookie settings based on environment
    const cookieOptions = {
      httpOnly: true,
      secure: false, // Set to false in development
      sameSite: "lax",
      path: '/',
      domain: 'localhost',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    };

    // Setting the cookies
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Set Authorization header
    res.setHeader('Authorization', `Bearer ${accessToken}`);

    return res.json({ 
      success: true,
      message: "Login successful", 
      sessionId,
      accessToken,
      empBean,
      user: {
        ...empBean,
        isAuthenticated: true
      }
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(err.message === "Invalid credentials" ? 401 : 500).json({ 
      success: false,
      message: err.message,
      user: {
        isAuthenticated: false
      }
    });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    return generateRefreshToken(req, res);
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};



module.exports = { loginController,refreshTokenController };
