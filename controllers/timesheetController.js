const TimesheetService = require("../service/timesheetService");

exports.createTimesheetController = async (req, res) => {
  try {

    // Calling service layer for validation and saving the timesheet
    const response = await TimesheetService.createTimesheet(req.body);

    // Send Success Response
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error Adding Timesheet:", error.message);
    return res.status(500).json({ error: "Failed to add timesheet. " + error.message });
  }
};

exports.getTimesheetController = async (req, res) => {
  try {
    // Fetch timesheets (optionally, you could filter by employee id from req.user or req.query)
    const timesheets = await TimesheetService.fetchTimesheets();
    return res.status(200).json(timesheets);
  } catch (error) {
    console.error("Error Fetching Timesheets:", error.message);
    return res.status(500).json({ error: "Fetching timesheets failed: " + error.message });
  }
};

exports.updateTimesheetController = async (req, res) => {
  try {
    const timesheetId = req.params.id;
    const updatedTimesheet = await TimesheetService.updateTimesheet(timesheetId, req.body);
    return res.status(200).json(updatedTimesheet);
  } catch (error) {
    console.error("Error Updating Timesheet:", error.message);
    return res.status(500).json({ error: "Updating timesheet failed: " + error.message });
  }
};

exports.deleteTimesheetController = async (req, res) => {
  try {
    const timesheetId = req.params.id;
    await TimesheetService.deleteTimesheet(timesheetId);
    return res.status(200).json({ message: "Timesheet deleted successfully" });
  } catch (error) {
    console.error("Error Deleting Timesheet:", error.message);
    return res.status(500).json({ error: "Deleting timesheet failed: " + error.message });
  }
};
