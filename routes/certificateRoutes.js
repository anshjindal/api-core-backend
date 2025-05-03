const express = require("express");
const router = express.Router();
const CertificateController = require("../controllers/certificateController");
const verifySession = require("../middlewares/authenticationMiddleware");
const Employee = require('../models/employee');

// Bulk upload route for certificates
router.post("/addBulkCertificate", verifySession, CertificateController.uploadBulkCertificates);

//  Update certificate sentAt
router.put("/send", async (req, res) => {
    const { empId, certificateName } = req.body;

    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { empId, 'certificates.name': certificateName },
            { $set: { 'certificates.$.sentAt': new Date() } },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee or certificate not found.' });
        }

        res.json({
            success: true,
            message: `${certificateName} marked as sent.`,
            updatedCertificates: updatedEmployee.certificates,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
