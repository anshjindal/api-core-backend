const createNewTimesheet = async (timesheetData) => {
  try {
    const newTimesheetData = "hi";
    return { message: "Created timesheet succesfully", newTimesheetData };
  } catch (error) {
    console.log("Failed to create timesheet:" + error.message);
    throw new Error(error.message);
  }
};
module.exports = {
  createNewTimesheet,
};
