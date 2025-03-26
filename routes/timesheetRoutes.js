const router = require("express").Router();
const {
  createTimesheet,
  getEmployeeTimesheet,
} = require("../controllers/timesheetController");
const verifySession = require("../middlewares/authenticationMiddleware");

router.route("/createTimesheet").post(verifySession, createTimesheet);
router.route("/:empId").get(verifySession, getEmployeeTimesheet);

module.exports = router;
