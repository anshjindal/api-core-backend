const mongoose = require('mongoose');

const DesignationSchema = new mongoose.Schema({
  designationId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: [/^DESGN\d{3}$/, 'Designation ID must follow the format DESGN001'],
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  departmentId: {
    type: String,
    ref: 'Department',
    required: true,
  },
  reportsTo: {
    type: String,
    ref: 'Designation',
    default: null, 
  },
  gradeLevel: {
    type: String,
    trim: true,
    enum: ["L1", "L2","L3","Senior", "Executive", "Manager", "Director"],
    default: "L1",
  },
  salaryRange: {
    type: String 
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  logId:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Designation', DesignationSchema);
