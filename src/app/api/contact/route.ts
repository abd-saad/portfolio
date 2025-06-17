// app/api/contact/route.ts (App Router) OR pages/api/contact.ts (Pages Router)
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { name, email, company, message } = body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.CONTACT_EMAIL, // your Gmail
      pass: process.env.CONTACT_EMAIL_PASS, // App password
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.CONTACT_EMAIL}>`,
    to: process.env.CONTACT_EMAIL, // send to yourself
    subject: `📩 New Contact from ${name}`,
    html: `
      <h3>You received a new message:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
