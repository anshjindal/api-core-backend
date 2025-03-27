const mongoose = require("mongoose");
const Employee = require("./employee");

const TimeEntrySchema = new mongoose.Schema({
  start: {
    type: String,
    required: [true, "Start time is required"],
    trim: true,
  },
  end: {
    type: String,
    required: [true, "End time is required"],
    trim: true,
  },
  type: {
    type: String,
    enum: ["Paid", "Unpaid", "Paid Break"],
    required: [true, "Time entry type is required"],
  },
});

const DaySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: true,
  },
  entries: [TimeEntrySchema]
});

const TimesheetSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    ref: "Employee",
  },
  weekStartDate: {
    type: Date,
    required: [true, "Week start date is required"],
  },
  days: [DaySchema],
  // Optional field to track the status of the timesheet
  status: {
    type: String,
    enum: ["active", "submitted", "approved", "rejected"],
    default: "active",
  }
});

module.exports = mongoose.model("Timesheet", TimesheetSchema, "timesheet");
