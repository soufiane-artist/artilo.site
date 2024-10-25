require('dotenv').config(); // تحميل القيم من .env
const nodemailer = require("nodemailer");

module.exports = async (userEmail, subject, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSEMAIL,
      },
      tls: {
        rejectUnauthorized: false, // تجاوز التحقق من الشهادة
      },
    });

    const mailOption = {
      from: `"artilo.site 🎨 " <${process.env.EMAIL}>`,
      to: userEmail,
      subject: subject,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOption);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Internal Server Error (NodeMailer)");
  }
};
