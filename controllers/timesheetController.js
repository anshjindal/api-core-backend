const { createNewTimesheet } = require("../service/timesheetService");

const createTimesheet = async (req, res) => {
  try {
    const response = await createNewTimesheet(req.body);
    res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Failed to create timesheet. " + error.message });
  }
};
const getEmployeeTimesheet = async (req, res) => {
  const { empId } = req.params;
  try {
    const response = "";
    res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: `Failed to get timesheet for employee ${empId}. ` + error.message,
    });
  }
};

module.exports = {
  createTimesheet,
  getEmployeeTimesheet,
};
