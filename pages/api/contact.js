import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { name, purpose, service, preferredLocation = [], requirement, email, phone, company = "" } = req.body;
   // Convert preferredLocation to a string
  const preferredLocationString = Array.isArray(preferredLocation)
    ? preferredLocation.join(", ")
    : preferredLocation;
  if (!name || !service || !preferredLocation || !requirement || !purpose || !email || !phone) {
    return res.status(400).json({ message: "All fields except 'company' are required." });
  }
   // Get the user's timezone and current timestamp in IST
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const istTimestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    // Correctly retrieve the user's IP address
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;

  let userCountry = 'Unknown';
  let userCity = 'Unknown'; 
  // console.log('IP is:', ip, req.socket.remoteAddress);
  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();
    userCountry = geoData?.country_name || 'Unknown';
    userCity = geoData?.city || 'Unknown';
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
Purpose: ${purpose}
Service: ${service}
Preferred Location: ${preferredLocation}
Requirement: ${requirement}
Email: ${email}
Phone: ${phone}
Company: ${company}
User Timezone: ${userTimezone}
Timestamp (IST): ${istTimestamp}
City: ${userCity}
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
      range: 'Sheet1!A:G',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
	  [
            name,
	    purpose,
            service,
            preferredLocationString || "Not specified",
            requirement,
	    email,
            phone,
            company || "Not provided",
	    userTimezone,
	    istTimestamp,
	    userCity,
	    userCountry,
          ],
	],
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

