const mongoose = require('mongoose');

const OffboardingProcessSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  checklist: {
    type: [String], // array of strings
    default: [],
  },
  emailRecipient: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, // automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('OffboardingProcess', OffboardingProcessSchema);
