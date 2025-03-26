const router = require("express").Router();
const {
  createTimesheet,
  getEmployeeTimesheets,
} = require("../controllers/timesheetController");
const verifySession = require("../middlewares/authenticationMiddleware");

router.route("/createTimesheet").post(verifySession, createTimesheet);
router.route("/:empId").get(verifySession, getEmployeeTimesheets);

module.exports = router;
