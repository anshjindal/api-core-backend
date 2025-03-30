const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const Employee = require("./models/employee");
const MONGODB_URI = process.env.MONGODB_URI;

const resetPassword = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    // ✅ Log which DB you're connected to
    console.log("🔌 Connected to:", mongoose.connection.name);

    const empId = "EMPLOYEE00001";
    const newPassword = "Test@123";

    const user = await Employee.findOne({ empId });

    if (!user) {
      console.log("❌ Employee not found:", empId);
      return process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    console.log(`✅ Password for ${empId} reset to "${newPassword}"`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

resetPassword();
