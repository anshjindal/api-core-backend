const mongoose = require("mongoose");

const OffboardingProcessSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  checklist: { type: [String], required: true },
  emailRecipient: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("OffboardingProcess", OffboardingProcessSchema);
