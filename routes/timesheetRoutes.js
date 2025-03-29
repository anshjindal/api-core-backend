const express = require('express'); // Ensure you're importing express
const router = express.Router();    // Initialize the router

const timesheetService = require('../service/timesheetService');

// Get all timesheets
router.get('/', async (req, res) => {
  try {
    console.log('Fetching timesheets...');
    const timesheets = await timesheetService.getAllTimesheets();
    console.log('Timesheets fetched:', timesheets);
    
    if (!timesheets || timesheets.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No timesheets found'
      });
    }

    res.status(200).json({
      success: true,
      data: timesheets
    });
  } catch (error) {
    console.error('Error in timesheet route:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// Get a single timesheet by ID
router.get('/:id', async (req, res) => {
  try {
    const timesheet = await timesheetService.getTimesheetById(req.params.id);
    if (!timesheet) {
      return res.status(404).json({
        success: false,
        error: 'Timesheet not found'
      });
    }
    res.status(200).json({
      success: true,
      data: timesheet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// Create a new timesheet
router.post('/', async (req, res) => {
  try {
    const timesheet = await timesheetService.createTimesheet(req.body);
    res.status(201).json({
      success: true,
      data: timesheet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || 'Invalid timesheet data'
    });
  }
});

// Update a timesheet
router.put('/:id', async (req, res) => {
  try {
    const timesheet = await timesheetService.updateTimesheet(req.params.id, req.body);
    if (!timesheet) {
      return res.status(404).json({
        success: false,
        error: 'Timesheet not found'
      });
    }
    res.status(200).json({
      success: true,
      data: timesheet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || 'Invalid timesheet data'
    });
  }
});

// Delete a timesheet
router.delete('/:id', async (req, res) => {
  try {
    const timesheet = await timesheetService.deleteTimesheet(req.params.id);
    if (!timesheet) {
      return res.status(404).json({
        success: false,
        error: 'Timesheet not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

module.exports = router;  // Export the router so it can be used in other files
