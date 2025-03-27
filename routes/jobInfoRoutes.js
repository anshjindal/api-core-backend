const express = require("express");
const router = express.Router();
const { getJobInfo } = require("../controllers/JobInfoController");

router.get("/", getJobInfo);

module.exports = router;
