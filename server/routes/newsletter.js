import { Router } from "express";
import axios from "axios";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendThankYouEmail = (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank you for subscribing!",
    html: `
      <html>
        <head>
          <style>
            /* Styles for the email */
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #83B735;
              color: #fff;
              padding: 20px;
              text-align: center;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            .content {
              padding: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank you for subscribing!</h1>
            </div>
            <div class="content">
              <p>Welcome to Anub Furniture's exclusive community. We're thrilled to have you onboard.</p>
              <p>Expect to receive regular updates on our latest products, exclusive offers, and much more.</p>
              <p>Stay tuned and explore the world of contemporary furniture with us!</p>
            </div>
            <div class="footer">
              <p>Best Regards,<br>Anub Furniture Team</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending thank you email:", error);
    } else {
      console.log("Thank you email sent:", info.response);
    }
  });
};

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  const mailchimpInstance = process.env.MAILCHIMP_INSTANCE;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const apiKey = process.env.MAILCHIMP_API_KEY;

  const data = {
    email_address: email,
    status: "subscribed",
  };

  const config = {
    headers: {
      Authorization: `apikey ${apiKey}`,
    },
  };

  try {
    await axios.post(
      `https://${mailchimpInstance}.api.mailchimp.com/3.0/lists/${listId}/members`,
      data,
      config
    );

    // Send thank you email
    sendThankYouEmail(email);

    res.status(200).json({
      is_subscribed: true,
      message: "Subscription successful and thank you email sent.",
    });
  } catch (error) {
    console.error("Subscription error:", error.response.data);
    if (
      error.response.status === 400 &&
      error.response.data.title === "Member Exists"
    ) {
      res.status(200).json({
        is_subscribed: false,
        message: "Email is already registered.",
      });
    } else {
      res
        .status(500)
        .json({ is_subscribed: false, message: "An error occurred." });
    }
  }
});

export default router;
