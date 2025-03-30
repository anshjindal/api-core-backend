const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
  internId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  status: { type: String, enum: ["Paid", "Unpaid"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  department: { type: String, required: true },
  capstoneProject: { type: String, required: true },
  mentor: { type: String, required: true },
  tasks: { type: [String], required: true },
  employmentType: { type: String, enum: ["Full-Time", "Part-Time"], required: true },
  location: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Intern", internSchema);