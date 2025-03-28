const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    team: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("Certificate", CertificateSchema, "certificate");