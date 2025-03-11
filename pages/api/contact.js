import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { name, service, requirement, email, phone } = req.body;

  // Optimistically respond to the client
  res.status(200).json({ success: true });

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const sendEmails = async () => {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'info@enoshinfra.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nService: ${service}\nRequirement: ${requirement}\nEmail: ${email}\nPhone: ${phone}`,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank You for Contacting Enosh Infra',
        text: `Dear ${name},\n\nThank you for reaching out. We will review your requirement and get back to you soon.\n\nBest,\nEnosh Infra Team`,
      });
    } catch (error) {
      console.error('Email sending error:', error);
    }
  };

  const saveToGoogleSheet = async () => {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:E',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [[name, service, requirement, email, phone]],
        },
      });
    } catch (error) {
      console.error('Google Sheets saving error:', error);
    }
  };

  // Execute background tasks without blocking the response
  Promise.all([sendEmails(), saveToGoogleSheet()]).catch(console.error);
}

