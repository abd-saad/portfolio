const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'CONTACT_EMAIL',
  'RESEND_API_KEY',
  'RESEND_EMAIL_FROM',
  'SENTRY_DSN',
  'SENTRY_AUTH_TOKEN',
] as const;

export function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
