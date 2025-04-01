const express = require("express");
const router = express.Router();
const Setting = require("../models/Setting");

// ✅ GET: Fetch latest appearance setting
router.get("/settings", async (req, res) => {
  try {
    const latest = await Setting.findOne().sort({ createdAt: -1 });
    if (!latest) {
      return res.status(404).json({ message: "No appearance setting found" });
    }
    res.status(200).json(latest);
  } catch (err) {
    console.error("Error fetching setting:", err);
    res.status(500).json({ message: "Failed to fetch appearance setting" });
  }
});


router.post("/settings", async (req, res) => {
  try {
    const updated = await Setting.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // Create if none exists
    });
    res.status(201).json({ message: "Appearance setting saved", data: updated });
  } catch (err) {
    console.error("Error saving setting:", err);
    res.status(500).json({ message: "Failed to save appearance setting" });
  }
});

module.exports = router;
