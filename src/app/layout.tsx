import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header, Footer } from '@/components/shared'

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
    url: 'https://devops-portfolio.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevOps Engineer Portfolio',
    description: 'Cloud infrastructure expert with 1+ years of experience in DevOps automation and scalable solutions.',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              "url": "https://devops-portfolio.com",
              "sameAs": [
                "https://github.com/abd-saad",
                "https://linkedin.com/in/devops-engineer"
              ],
              "knowsAbout": [
                "AWS",
                "Kubernetes",
                "Docker",
                "Terraform",
                "CI/CD",
                "Infrastructure as Code",
                "Cloud Architecture",
                "DevOps Automation"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}