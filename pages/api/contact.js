import { google } from "googleapis";
import nodemailer from "nodemailer";

// Google Sheets Credentials
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
//const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, '\n');

// Email Credentials (Using Zoho Mail SMTP)
const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.zoho.com";
const EMAIL_PORT = process.env.EMAIL_PORT || 465;
const EMAIL_USER = process.env.EMAIL_USER; // Your Zoho Mail (e.g., info@enoshinfra.com)
const EMAIL_PASS = process.env.EMAIL_PASS; // Zoho App Password

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, service, requirement, email, phone } = req.body;

    if (!name || !email || !service || !phone || !requirement) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Google Sheets API setup
    const auth = new google.auth.JWT(
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      GOOGLE_PRIVATE_KEY,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, service, requirement, email, phone, new Date().toISOString()]],
      },
    });

    // Send email notifications
    await sendEmailToAdmin(name, service, requirement, email, phone);
    await sendThankYouEmail(email, name);

    return res.status(200).json({ message: "Form submitted successfully!" });

  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Send email to admin (you)
async function sendEmailToAdmin(name, service, requirement, email, phone) {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Bypass SSL verification if needed
    },
  });

  await transporter.sendMail({
    from: `"Enosh Infra" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    subject: "New Contact Form Submission",
    text: `New Inquiry:\n\nName: ${name}\nService: ${service}\nRequirement: ${requirement}\nEmail: ${email}\nPhone: ${phone}`,
  });
}

// Send thank-you email to the user
async function sendThankYouEmail(email, name) {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: `"Enosh Infra" <${EMAIL_USER}>`,
    to: email,
    subject: "Thank You for Contacting Enosh Infra!",
    text: `Hi ${name},\n\nThank you for reaching out! Our team will review your requirements and get back to you shortly.\n\nBest,\nEnosh Infra Team`,
  });
}

