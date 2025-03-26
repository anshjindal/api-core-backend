const TimesheetSchema = require("../models/timesheet");
const redisClient = require("../utils/redisConfig");
const createNewTimesheet = async (timesheetData) => {
  try {
    const requiredFields = ["task", "hoursWorked", "date", "empId"];
    for (const field of requiredFields) {
      if (!timesheetData[field]) {
        throw new Error(`Missing or Invalid entry for ${field} in timesheet`);
      }
    }
    const { task, hoursWorked, date, empId } = timesheetData;
    const sessions = await redisClient.keys(`session:${empId}:*`);

    if (sessions.length === 0) {
      throw new Error(`Provided employee id ${empId}, does not exist`);
    }

    const newTimesheet = new TimesheetSchema({
      empId,
      task,
      date,
      hoursWorked,
    });
    const savedTimesheet = await newTimesheet.save();
    return {
      message: "Created timesheet succesfully",
      timesheetId: savedTimesheet._id,
    };
  } catch (error) {
    console.log("Failed to create timesheet:" + error.message);
    throw new Error(error.message);
  }
};
const getAllEmployeeTimesheets = async (empId) => {
  try {
    if (!empId) {
      throw new Error("Please provide an employee id");
    }
    const sessions = await redisClient.keys(`session:${empId}:*`);
    if (sessions.length === 0) {
      throw new Error(`Provided employee id ${empId}, does not exist`);
    }
    //might return an empty array if no timesheets are found
    const employeeTimesheets = await TimesheetSchema.find({ empId });
    return {
      message: "Fetched employee timesheets sucessfully",
      employeeTimesheets,
    };
  } catch (error) {
    console.log("Failed to get employee timesheets:" + error.message);
    throw new Error(error.message);
  }
};
module.exports = {
  createNewTimesheet,
  getAllEmployeeTimesheets,
};
