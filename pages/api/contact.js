import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import fetch from 'node-fetch';
import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

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
    const startTime = Date.now();
    const istTimestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    const parsedData = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { fields, files } = parsedData;
    const { name, purpose, service, requirement, email, phone, company = "" } = fields;

    // Fix preferredLocation extraction
    const preferredLocation = Object.keys(fields)
      .filter(key => key.startsWith("preferredLocation"))
      .map(key => fields[key][0]);

    if (!name || !service || !preferredLocation || !requirement || !purpose || !email || !phone) {
      return res.status(400).json({ message: "All fields except 'company' are required." });
    }

    const preferredLocationString = Array.isArray(preferredLocation) ? preferredLocation.join(", ") : preferredLocation;
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const forwarded = req.headers['x-forwarded-for'];
    let ip = 'Unknown';

    // Enhanced IP detection with IPv4 extraction from IPv6 mapping
    if (forwarded) {
      const ips = forwarded.split(',').map(ip => ip.trim());
      ip = ips[0]; // Take the first IP from the chain (client IP)
      console.log('X-Forwarded-For IPs:', ips);
      if (ip.startsWith('::ffff:')) {
        const ipv4Match = ip.match(/::ffff:(\d+\.\d+\.\d+\.\d+)/);
        if (ipv4Match && ipv4Match[1]) {
          ip = ipv4Match[1];
          console.log('Extracted IPv4 from IPv6:', ip);
        } else {
          console.log('Invalid IPv4-mapped IPv6, falling back to test IP:', ip);
          ip = '8.8.8.8';
        }
      } else if (ip.startsWith('::') || ip.startsWith('fe80::')) {
        console.log('Detected local IPv6, falling back to test IP:', ip);
        ip = '8.8.8.8';
      }
    } else if (req.socket?.remoteAddress) {
      ip = req.socket.remoteAddress;
      console.log('Socket Remote Address:', ip);
      if (ip.startsWith('::ffff:')) {
        const ipv4Match = ip.match(/::ffff:(\d+\.\d+\.\d+\.\d+)/);
        if (ipv4Match && ipv4Match[1]) {
          ip = ipv4Match[1];
          console.log('Extracted IPv4 from IPv6:', ip);
        } else {
          console.log('Invalid IPv4-mapped IPv6, falling back to test IP:', ip);
          ip = '8.8.8.8';
        }
      } else if (ip.startsWith('::') || ip.startsWith('fe80::')) {
        console.log('Detected local IPv6, falling back to test IP:', ip);
        ip = '8.8.8.8';
      }
    } else {
      ip = '8.8.8.8'; // Fallback to test IP
      console.log('Fallback IP used:', ip);
    }

    let userCountry = 'Unknown';
    let userCity = 'Unknown';
    // Enhanced geolocation fetch with 1000ms timeout and fallback
    try {
      const geoPromise = fetch(`https://ipapi.co/${ip}/json/`, { timeout: 1000 }).then(res => res.json());
      const geoTimeout = new Promise(resolve => setTimeout(() => resolve({ country_name: 'Unknown', city: 'Unknown' }), 1000));
      const geoData = await Promise.race([geoPromise, geoTimeout]);
      console.log('Geolocation Response for IP', ip, ':', geoData); // Debug log
      userCountry = geoData.country_name || 'Unknown';
      userCity = geoData.city || 'Unknown'; // Keep city as Unknown if no data
      if (userTimezone === 'UTC') {
        userTimezone = geoData.timezone || 'Unknown';
      }
    } catch (error) {
      console.error('Geolocation Error for IP', ip, ':', error.message);
      userCountry = 'Unknown';
      userCity = 'Unknown'; // Keep city as Unknown on error
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

    // Logo for header (larger)
    const logoHtmlHeader = `<img src="https://enoshinfra.com/fullfav.png" alt="Enosh Infra Logo" style="max-width: 150px; height: auto; display: inline-block;" onerror="this.style.display='none';this.outerHTML='<img src=\'https://via.placeholder.com/150\' alt=\'Placeholder Logo\' style=\'max-width: 150px; height: auto; display: inline-block;\'>';">`;

    // Signature HTML: corporate look with centered logo and centered icons below it
    const signatureHtmlContent = `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #ffffff; line-height: 1.2;">
        <tr>
          <td align="center" style="padding-bottom: 5px;">
            <img src="https://enoshinfra.com/fullfav.png" alt="Enosh Infra Logo" style="width: 150px; height: auto; display: block; margin: 0 auto;">
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-top: 5px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
              <tr>
                <td style="padding: 0 7.5px;">
                  <a href="https://www.enoshinfra.com" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                    <img src="https://img.icons8.com/ios-filled/24/FFFFFF/globe--v1.png" alt="Website" style="width: 24px; height: 24px; vertical-align: middle;">
                  </a>
                </td>
                <td style="padding: 0 7.5px;">
                  <a href="tel:+918073582033" style="text-decoration: none;">
                    <img src="https://img.icons8.com/material-outlined/24/25D366/phone.png" alt="Phone" style="width: 24px; height: 24px; vertical-align: middle;">
                  </a>
                </td>
                <td style="padding: 0 7.5px;">
                  <a href="https://wa.me/918073582033" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                    <img src="https://img.icons8.com/color/48/25D366/whatsapp--v1.png" alt="WhatsApp" style="width: 24px; height: 24px; vertical-align: middle;">
                  </a>
                </td>
                <td style="padding: 0 7.5px;">
                  <a href="https://www.linkedin.com/company/enoshinfra" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                    <img src="https://img.icons8.com/color/48/0A66C2/linkedin.png" alt="LinkedIn" style="width: 24px; height: 24px; vertical-align: middle;">
                  </a>
                </td>
                <td style="padding: 0 7.5px;">
                  <a href="https://www.instagram.com/enoshinfra" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                    <img src="https://img.icons8.com/color/48/E1306C/instagram-new--v2.png" alt="Instagram" style="width: 24px; height: 24px; vertical-align: middle;">
                  </a>
                </td>
                <td style="padding: 0 7.5px;">
                  <a href="mailto:info@enoshinfra.com" style="text-decoration: none;">
                    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/new-post.png" alt="Email" style="width: 24px; height: 24px; vertical-align: middle;">
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;
    console.log('Using external logo URL:', 'https://enoshinfra.com/fullfav.png');

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

    // Parallel email sending
    const [adminEmail, userEmail] = await Promise.all([
      transporter.sendMail({
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
               ${userCity === 'Unknown' && userCountry === 'Unknown' ? `<p><strong>Detected IP:</strong> ${ip}</p>` : ''}
               ${attachments.map((img) => `<p><img src="cid:${img.cid}" width="400" /></p>`).join('')}`,
        attachments,
      }),
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Service charge confirmation',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Service Charge Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #111827; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        ${logoHtmlHeader}
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h1 style="font-size: 24px; color: #333333; margin: 0 0 20px;">Service Charge Confirmation</h1>
        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 10px;">Dear ${name},</p>
        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
          Thank you for choosing <strong>Enosh Infra</strong> as your property consultant.
        </p>
        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
          We specialize in industrial and commercial property consultancy and management across Bangalore, providing end-to-end solutions with a focus on quality and efficiency. By leveraging advanced AI technology, we ensure the most efficient and premium solutions tailored to your needs.
        </p>
        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
          Our service charge is <strong>one month’s rent plus GST</strong>. Kindly reply to this email and confirm your acceptance of the same so we can proceed further. This amount is payable upon signing the rental agreement or finalizing the property.
        </p>
        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
          We look forward to assisting you in securing the perfect property.
        </p>
        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0;">
          Best Regards,<br>
          Enosh Infra
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px 20px; border-top: 1px solid #e0e0e0; background-color: #111827;">
        ${signatureHtmlContent}
      </td>
    </tr>
  </table>
</body>
</html>`,
      }),
    ]);

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
      range: 'Sheet1!A:K',
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

    const endTime = Date.now();
    console.log(`Processing time: ${endTime - startTime}ms`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
