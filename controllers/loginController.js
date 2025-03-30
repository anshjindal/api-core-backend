const { login } = require("../service/authenticationService");
const EmployeeResponse = require("../helpers/employeeResponse");
const { generateRefreshToken } = require("../utils/jwtUtility");

const loginController = async (req, res) => {
  try {
    const { empId, password } = req.body;
    if (!empId || !password) {
      return res.status(400).json({ message: "empId and password are required" });
    }

    const { accessToken, refreshToken, sessionId, tempEmployee } = await login(empId, password, req);
    const empBean = EmployeeResponse.fromEntity(tempEmployee);

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "strict" });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

    return res.json({ message: "Login successful", sessionId, accessToken, empBean });
  } catch (err) {
    return res.status(err.message === "Invalid credentials" ? 401 : 500).json({ message: err.message });
  }
};

const refreshTokenController = (req, res) => {
  return generateRefreshToken(req, res);
};

module.exports = {
  loginController,
  refreshTokenController
};
