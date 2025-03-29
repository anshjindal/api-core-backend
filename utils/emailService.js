const nodemailer = require("nodemailer");
require("dotenv").config();

// Define transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Define and export the email sending function
const sendEmail = async (to, subject, text) => {
    try {
        if (typeof to !== 'string' || !to.trim()) {
            console.error("No valid recipient email provided. Got:", to);
            throw new Error("Recipient email is required and must be a non-empty string.");
        }

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = sendEmail;
