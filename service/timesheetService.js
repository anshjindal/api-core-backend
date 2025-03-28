// In your service file (timesheetService.js)
const Timesheet = require('../models/timesheetModel');

// Fetch all timesheets
const getAllTimesheets = async () => {
  try {
    console.log('Fetching all timesheets...');
    const timesheets = await Timesheet.find({});
    console.log('Found timesheets:', timesheets);
    return timesheets;
  } catch (error) {
    console.error('Error fetching timesheets:', error);
    throw new Error('Could not fetch timesheets');
  }
};

const getTimesheetById = async (id) => {
  try {
    const timesheet = await Timesheet.findById(id);
    return timesheet;
  } catch (error) {
    console.error('Error fetching timesheet:', error);
    throw new Error('Could not fetch timesheet');
  }
};

const createTimesheet = async (timesheetData) => {
  try {
    const timesheet = new Timesheet(timesheetData);
    await timesheet.save();
    return timesheet;
  } catch (error) {
    console.error('Error creating timesheet:', error);
    throw new Error('Could not create timesheet');
  }
};

const updateTimesheet = async (id, updateData) => {
  try {
    const timesheet = await Timesheet.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    return timesheet;
  } catch (error) {
    console.error('Error updating timesheet:', error);
    throw new Error('Could not update timesheet');
  }
};

const deleteTimesheet = async (id) => {
  try {
    const timesheet = await Timesheet.findByIdAndDelete(id);
    return timesheet;
  } catch (error) {
    console.error('Error deleting timesheet:', error);
    throw new Error('Could not delete timesheet');
  }
};

module.exports = {
  getAllTimesheets,
  getTimesheetById,
  createTimesheet,
  updateTimesheet,
  deleteTimesheet
};
