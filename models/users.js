const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  email: String,
  role: {
    type: String,
    enum: ['Employee', 'Intern', 'Partner', 'Capstone Student'],
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },

  internDetails: {
    type: Object,
    default: null
  },
  capstoneDetails: {
    type: Object,
    default: null
  },
  partnerDetails: {
    type: Object,
    default: null
  },

  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },

  documents: [{
    docId: Schema.Types.ObjectId,
    name: String,
    url: String,
    uploadedAt: Date
  }],

  certificates: [{
    certId: Schema.Types.ObjectId,
    type: String,
    generatedAt: Date,
    sentAt: {
      type: Date,
      default: null
    },
    url: String
  }]
});

module.exports = mongoose.model('User', userSchema);
