const transporter = require("../utils/mailer");

const sendEnquiry = async (req, res) => {
  try {
    const { name, email, phone, product, message } = req.body;

    // Mail to Admin
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.PERSONAL_MAIL,
      subject: `New Product Enquiry from ${name}`,
      html: `
        <h2>Product Enquiry</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Auto Reply Mail
    const autoReply = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We Received Your Enquiry",
      html: `
        <h2>Thank You ${name}</h2>

        <p>
          We received your product enquiry successfully.
        </p>

        <p>
          Our team will contact you shortly.
        </p>

        <br />

        <p>
          This is an automated mail. Please do not reply.
        </p>
      `,
    };

    // Send both mails
    await transporter.sendMail(adminMail);
    await transporter.sendMail(autoReply);

    res.status(200).json({
      success: true,
      message: "Enquiry sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  sendEnquiry,
};
