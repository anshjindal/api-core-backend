const mongoose = require('mongoose');

// Define the schema for timesheets
const timesheetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  hours: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  __v: {
    type: Number,
    default: 0
  }
}, { 
  collection: 'timesheets',
  // Add timestamps for replica set
  timestamps: true,
  // Ensure writes are acknowledged
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
});

// Update the updatedAt timestamp before saving
timesheetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model
const Timesheet = mongoose.model('Timesheet', timesheetSchema);

// Export the model
module.exports = Timesheet;
