import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { name, service, requirement, email, phone } = req.body;

   // Get the user's timezone and current timestamp in IST
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const istTimestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

  // Get user's IP and fetch location info
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let userCountry = 'Unknown';
    try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();
    userCountry = geoData.country_name || 'Unknown';
  } catch (error) {
    console.error('Error fetching user location:', error);
  }

  try {
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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'info@enoshinfra.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}
Service: ${service}
Requirement: ${requirement}
Email: ${email}
Phone: ${phone}
User Timezone: ${userTimezone}
Timestamp (IST): ${istTimestamp}
Country: ${userCountry}`,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Enosh Infra',
      text: `Dear ${name},\n\nThank you for reaching out. We will review your requirement and get back to you soon.\n\nBest,\nEnosh Infra Team`,
    });

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
        values: [[name, service, requirement, email, phone, userTimezone, istTimestamp, userCountry]],
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

