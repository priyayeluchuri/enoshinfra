import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import fetch from 'node-fetch';
import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = formidable({ multiples: true, keepExtensions: true });

  try {
    const parsedData = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { fields, files } = parsedData;
    //console.log('Received Fields:', fields);
    //console.log('Received Files:', files);
    const { name, purpose, service, requirement, email, phone, company = "" } = fields;

    // Fix preferredLocation extraction
    const preferredLocation = Object.keys(fields)
     .filter(key => key.startsWith("preferredLocation"))
     .map(key => fields[key][0]); // Extracting values

    //console.log("Parsed Preferred Location:", preferredLocation);
    if (!name || !service || !preferredLocation || !requirement || !purpose || !email || !phone) {
      return res.status(400).json({ message: "All fields except 'company' are required." });
    }
    
    const preferredLocationString = Array.isArray(preferredLocation) ? preferredLocation.join(", ") : preferredLocation;
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const istTimestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;

    let userCountry = 'Unknown' 
    let userCity = 'Unknown';
    try {
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoRes.json();
      userCountry = geoData?.country_name || 'Unknown';
      userCity = geoData?.city || 'Unknown';
      if (userTimezone == 'UTC') { 
            userTimezone = geoData?.timezone || 'Unknown';
      }
    } catch (error) {
      console.error('Error fetching user location:', error);
    }

    const attachments = [];
    if (files.images) {
      const images = Array.isArray(files.images) ? files.images : [files.images];
      for (const image of images) {
        try {
          const buffer = await sharp(image.filepath).resize(800).jpeg({ quality: 80 }).toBuffer();
          attachments.push({
            filename: image.originalFilename,
            content: buffer,
            contentType: image.mimetype,
            cid: image.newFilename,
          });
        } catch (err) {
          console.error('Error processing image:', err);
        }
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'info@enoshinfra.com',
      subject: `New Contact Form Submission - ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Purpose:</strong> ${purpose}</p>
             <p><strong>Service:</strong> ${service}</p>
             <p><strong>Preferred Location:</strong> ${preferredLocationString}</p>
             <p><strong>Requirement:</strong> ${requirement}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Company:</strong> ${company || 'Not provided'}</p>
	     <p><strong>TimeZone:</strong> ${userTimezone}</p>
             <p><strong>Timestamp (IST):</strong> ${istTimestamp}</p>
             <p><strong>City:</strong> ${userCity}</p>
             <p><strong>Country:</strong> ${userCountry}</p>
             ${attachments.map((img) => `<p><img src="cid:${img.cid}" width="400" /></p>`).join('')}`,
      attachments,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Service Charge Details and Confirmation Required',
      text: `Dear ${name},\n\nThank you for choosing Enosh Infra as your property consultant.\n\nWe specialize in industrial and commercial property consultancy and management across Bangalore, providing end-to-end solutions with a focus on quality and efficiency. By leveraging advanced AI technology, we ensure the most efficient and premium solutions tailored to your needs.\n\nOur service charge is one month’s rent plus GST. Kindly reply to this Email and confirm your acceptance of the same so we can proceed further. This amount is payable upon signing the rental agreement or finalizing the property.\n\nBest Regards,\nEnosh Infra Team\n📞 +91-8073582033\n🌐 www.enoshinfra.com\n✉️ info@EnoshInfra.com`,
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
  range: 'Sheet1!A:K', // Ensure this matches the number of values
  valueInputOption: 'RAW',
  insertDataOption: 'INSERT_ROWS',
  requestBody: {
    values: [[
      String(name || ""), 
      String(purpose || ""), 
      String(service || ""), 
      String(preferredLocationString || ""), 
      String(requirement || ""), 
      String(email || ""), 
      String(phone || ""), 
      String(company || ""), 
      String(userTimezone || ""),
      String(istTimestamp || ""), 
      String(userCity || ""), 
      String(userCountry || "")
    ]],
  },
});

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

