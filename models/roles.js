const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    enum: ["EMPLOYEE", "HR", "ADMIN"],
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Role", roleSchema);

