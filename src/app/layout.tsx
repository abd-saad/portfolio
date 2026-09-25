import { validateEnv } from '@/lib/env'
validateEnv()

import type { Metadata } from 'next'
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
  // Fetch enabled homepage sections for navigation/footer
  const homepageSections = await getHomepage();
  // Only pass section_type for navigation/footer, filter out undefined
  const navSections = homepageSections
    .filter(s => typeof s.section_type === 'string' && s.section_type !== 'hero')
    .map(s => ({ section_type: s.section_type as string }));

  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Abdullah Saad",
              "jobTitle": "Senior DevOps Engineer",
              "description": "Experienced DevOps Engineer specializing in cloud infrastructure, automation, and scalable solutions",
              "url": "https://abd-saad.vercel.app",
              "sameAs": [
                "https://github.com/abd-saad",
                "https://linkedin.com/in/abdullah-saad-93a0181b3"
              ],
            })
          }}
        />
        <script
            dangerouslySetInnerHTML={{
              __html: themeScript,
            }}
        />
      </head>
      <body className={inter.className}>
        <Header sections={navSections} />
        <main className="min-h-screen">
          {children}
          <SpeedInsights />
          <Analytics />
        </main>
        <Footer sections={navSections} />
      </body>
    </html>
  )
}