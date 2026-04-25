import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/ui/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiter: max 3 requests per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

function validateFields(fields: Record<string, unknown>): string | null {
  const { name, email, message } = fields;
  if (!name || typeof name !== 'string' || name.trim().length === 0) return 'Name is required';
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Valid email is required';
  if (!message || typeof message !== 'string' || message.trim().length === 0) return 'Message is required';
  if (name.length > 100) return 'Name too long';
  if (email.length > 254) return 'Email too long';
  if (message.length > 5000) return 'Message too long';
  return null;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const body = await req.json();
  const { name, email, company, message } = body;

  const validationError = validateFields({ name, email, message });
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const safeName = String(name).trim();
  const safeEmail = String(email).trim();
  const safeCompany = company ? String(company).trim() : undefined;
  const safeMessage = String(message).trim();

  const { error } = await resend.emails.send({
    from: process.env.RESEND_EMAIL_FROM!,
    to: [process.env.CONTACT_EMAIL!],
    subject: `New message from ${safeName}`,
    html: EmailTemplate({ name: safeName, email: safeEmail, company: safeCompany, message: safeMessage }),
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
