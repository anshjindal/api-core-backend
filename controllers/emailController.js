const { sendCertificateEmail } = require("../utils/emailHelper");

const sendBulkCertificates = async (req, res) => {
    const { recipients } = req.body; // Array of { email, certificateUrl }

    if (!Array.isArray(recipients)) {
        return res.status(400).json({ message: "Invalid data format" });
    }

    try {
        const results = await Promise.allSettled(
            recipients.map(({ email, certificateUrl }) =>
                sendCertificateEmail(email, certificateUrl)
            )
        );

        const failed = results.filter(r => r.status === "rejected");

        if (failed.length > 0) {
            return res.status(207).json({ 
                message: "Some emails failed to send",
                failedCount: failed.length
            });
        }

        res.status(200).json({ message: "All certificates sent successfully!" });
    } catch (err) {
        console.error("Email send error:", err);
        res.status(500).json({ message: "Failed to send certificates" });
    }
};

module.exports = { sendBulkCertificates };
