const mongoose = require("mongoose");

const TimesheetSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: [true, "Employee id is required"],
      ref: "Employee",
    },
    task: {
      type: String,
      required: [true, "Task done required"],
      trim: true,
    },
    hoursWorked: {
      type: Number,
      required: [true, "Hours worked required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Pending",
    },
    date: {
      type: String,
      required: [true, "Work date required"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("timesheet", TimesheetSchema);
