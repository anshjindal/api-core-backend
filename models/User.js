const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['HR', 'Admin', 'Employee'], required: true },
    offboardingProcessId: { type: String, default: null }
});

module.exports = mongoose.model('User', userSchema);
