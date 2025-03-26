const mongoose = require("mongoose");

const TimesheetSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true,
  },
  hoursWorked: {
    type: Number,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Pending",
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("TimesheetSchema", TimesheetSchema);
