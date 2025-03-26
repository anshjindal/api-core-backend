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
    return { message: "Created timesheet succesfully", savedTimesheet };
  } catch (error) {
    console.log("Failed to create timesheet:" + error.message);
    throw new Error(error.message);
  }
};
module.exports = {
  createNewTimesheet,
};
