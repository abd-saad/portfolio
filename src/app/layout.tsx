import { validateEnv } from '@/lib/env'
validateEnv()

import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header, Footer } from '@/components/shared'
import { getHomepage } from '@/services/homepage'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Abdullah Saad Portfolio - Devops Engineer',
  description: 'Professional DevOps Engineer specializing in cloud infrastructure, automation solutions, and scalable system architecture.',
  keywords: 'DevOps Engineer, Cloud Architecture, AWS, Kubernetes, CI/CD, Infrastructure as Code, Docker, Terraform',
  authors: [{ name: 'Abdullah Saad' }],
  openGraph: {
    title: 'Abdullah Saad Portfolio - Devops Engineer',
    description: 'Professional DevOps Engineer specializing in cloud infrastructure, automation solutions, and scalable system architecture.',
    type: 'website',
    url: 'https://abd-saad.vercel.app',
  }
}
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Abdullah Saad',
  jobTitle: 'Senior DevOps Engineer',
  description:
      'Experienced DevOps Engineer specializing in cloud infrastructure, automation, and scalable solutions',
  url: 'https://abd-saad.vercel.app',
  sameAs: [
    'https://github.com/abd-saad',
    'https://linkedin.com/in/abdullah-saad-93a0181b3',
  ],
}
const themeScript = `
(function() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const theme =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : 'dark';

    document.documentElement.dataset.theme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homepageSections = await getHomepage();
  const navSections = homepageSections
    .filter(s => typeof s.section_type === 'string' && s.section_type !== 'hero')
    .map(s => ({
      section_type: s.section_type as string,
      enabled: s.enabled === true,
    }));

  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth">
      <head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </head>
      <body className={inter.className}>
        <Script
            id="theme-init"
            strategy="beforeInteractive"
        >
          {themeScript}
        </Script>
        <Header sections={navSections} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer sections={navSections} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}