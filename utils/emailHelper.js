const nodemailer = require("nodemailer");

const sendCertificateEmail = async (email, certificateUrl) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === "true", 
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Your Certificate from Wouessi",
        html: `
            <p>Hello,</p>
            <p>Please find your certificate at the following link:</p>
            <a href="${certificateUrl}">${certificateUrl}</a>
            <p>Best regards,<br/>Wouessi Team</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendCertificateEmail };
