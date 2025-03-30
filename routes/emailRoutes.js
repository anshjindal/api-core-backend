const express = require("express");
const sendEmail = require("../utils/emailService");
const router = express.Router();

router.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    // Validate required fields
    if (!to || !subject || !text) {
        return res.status(400).json({ error: "Missing required fields: 'to', 'subject', or 'text'." });
    }

    try {
        await sendEmail(to, subject, text);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

module.exports = router;
