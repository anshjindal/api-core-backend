const mongoose = require("mongoose");
const User = require('./users');

const TimesheetSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    index: true
  },
  weekStartDate: { 
    type: Date, 
    required: true,
    index: true
  },
  entries: [
    {
      date: { 
        type: Date, 
        required: true,
        validate: {
          validator: function(v) {
            return v <= new Date();
          },
          message: 'Entry date cannot be in the future'
        }
    },
      project: { 
        type: String, 
        required: true 
    },
      hours: { 
        type: Number, 
        required: true,
        min: [0, 'Hours cannot be negative'],
        max: [24, 'Hours cannot exceed 24 per day'] 
    },
      rippenWork: { 
        type: Boolean, 
        default: false 
    },
      capstoneProject: { 
        type: Boolean, 
        default: false 
    },
      status: { 
        type: String, 
        enum: ["Pending", "Approved", "Rejected"], 
        default: "Pending" 
    },
      rejectionComment: String,
    },
  ],
},{ timestamps: true });

TimesheetSchema.index({ userId: 1, weekStartDate: 1 });

module.exports = mongoose.model("Timesheet", TimesheetSchema);
