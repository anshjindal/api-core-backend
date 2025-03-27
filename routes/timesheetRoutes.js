const express = require("express");
const {
  getTimesheetController,
  createTimesheetController,
  updateTimesheetController,
  deleteTimesheetController,
} = require("../controllers/timesheetController");
const verifySession = require("../middlewares/authenticationMiddleware");
const router = express.Router();

// GET route to fetch timesheets (for the authenticated user)
router.get("/", verifySession, getTimesheetController);

// POST route to create a new timesheet
router.post("/", verifySession, createTimesheetController);

// PUT route to update an existing timesheet
router.put("/:id", verifySession, updateTimesheetController);

// DELETE route to remove a timesheet
router.delete("/:id", verifySession, deleteTimesheetController);

module.exports = router;
