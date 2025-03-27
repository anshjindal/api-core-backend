const router = require("express").Router();
const { createTimesheet } = require("../controllers/timesheetController");
const verifySession = require("../middlewares/authenticationMiddleware");

router.route("/createTimesheet").post(verifySession, createTimesheet);

module.exports = router;
