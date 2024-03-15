// api/contact.js

import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'oscar_mcintosh@msn.com';

export default async function(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Process form data (e.g., send email)
    try {
      const transporter = nodemailer.createTransport({
        // Setup your email transporter here
      });

      await transporter.sendMail({
        from: 'your-email@example.com',
        to: RECIPIENT_EMAIL,
        subject: 'New Contact Form Submission',
        text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `
      });

      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to submit form' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
