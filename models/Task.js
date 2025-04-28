const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Pending", "Done"], default: "Pending" },
  assignee: { type: String },
  timeTracked: { type: Number, default: 0 },
  startDate: { type: Date },
  dueDate: { type: Date },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
