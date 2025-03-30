const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  teamId: {
    type: String,
    unique: true,
    trim: true
  },
  teamName: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Team name should be min 3 characters"],
    maxlength: [50, "Team name should be max of 50 characters"]
  },
  teamType: {
    type: String,
    required: true,
    enum: ["Team Member", "Intern", "Partner", "Capstone Student"],
    default: "Team Member"
  },
  members: [{
    empId: {
      type: String,
      required: true,
      ref: "Employee"
    },
    role: {
      type: String,
      required: true,
      enum: ["Team Lead", "Member"]
    },
    joinDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  }],
  projectId: {
    type: String,
    trim: true
  },
  documents: [{
    docName: String,
    docType: String,
    docUrl: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    uploadedBy: {
      type: String,
      ref: "Employee"
    }
  }],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  createdBy: {
    type: String,
    required: true,
    ref: "Employee"
  },
  updatedBy: {
    type: String,
    ref: "Employee"
  }
}, {
  timestamps: true
});

// Index for faster queries (removed duplicate teamId index)
TeamSchema.index({ teamType: 1 });
TeamSchema.index({ status: 1 });
TeamSchema.index({ "members.empId": 1 });

// Auto-generate teamId before saving
TeamSchema.pre("save", async function(next) {
  if (!this.teamId) {
    try {
      const count = await mongoose.model("Team").countDocuments();
      this.teamId = `TEAM${String(count + 1).padStart(5, "0")}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team; 