const Timesheet = require("../models/timesheet");

const createTimesheet = async (timesheetData) => {
  try {
    // You can add additional business logic or validation here if needed
    const newTimesheet = await Timesheet.create(timesheetData);
    return newTimesheet;
  } catch (error) {
    console.error("Error creating timesheet:", error.message);
    throw new Error("Timesheet creation failed: " + error.message);
  }
};

const fetchTimesheets = async (filter = {}) => {
  try {
    // Optionally, you can pass a filter (e.g., by empId) to fetch specific timesheets
    const timesheets = await Timesheet.find(filter);
    return timesheets;
  } catch (error) {
    console.error("Error fetching timesheets:", error.message);
    throw new Error("Fetching timesheets failed: " + error.message);
  }
};

const updateTimesheet = async (timesheetId, updateData) => {
  try {
    const updatedTimesheet = await Timesheet.findByIdAndUpdate(
      timesheetId,
      updateData,
      { new: true }
    );
    if (!updatedTimesheet) {
      throw new Error("Timesheet not found");
    }
    return updatedTimesheet;
  } catch (error) {
    console.error("Error updating timesheet:", error.message);
    throw new Error("Updating timesheet failed: " + error.message);
  }
};

const deleteTimesheet = async (timesheetId) => {
  try {
    const deletedTimesheet = await Timesheet.findByIdAndDelete(timesheetId);
    if (!deletedTimesheet) {
      throw new Error("Timesheet not found");
    }
    return deletedTimesheet;
  } catch (error) {
    console.error("Error deleting timesheet:", error.message);
    throw new Error("Deleting timesheet failed: " + error.message);
  }
};

module.exports = {
  createTimesheet,
  fetchTimesheets,
  updateTimesheet,
  deleteTimesheet,
};
