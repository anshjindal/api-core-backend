const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  theme: String,
  fontSize: String,
  layout: String,
  // Add more appearance options as needed
}, { timestamps: true });

module.exports = mongoose.model("Setting", settingSchema);
