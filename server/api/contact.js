// server/api/contact.js

import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'oscar_mcintosh@msn.com';

export default defineEventHandler(async (event) => {
  if (event.method === 'POST') {
    const body = await readBody(event);
    const { name, email, message } = body;

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

      return { message: 'Form submitted successfully' };
    } catch (error) {
      console.error(error);
      throw createError({
        statusCode: 500,
        message: 'Failed to submit form'
      });
    }
  } else {
    throw createError({
      statusCode: 405,
      message: 'Method Not Allowed'
    });
  }
});
