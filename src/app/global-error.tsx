"use client";

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import { ErrorState } from '@/components/shared'
import './globals.css'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)

    try {
      const savedTheme = localStorage.getItem('theme')
      document.documentElement.dataset.theme =
        savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
    } catch {
      document.documentElement.dataset.theme = 'dark'
    }
  }, [error])

  return (
    <html lang="en" data-theme="dark">
      <body>
        <main className="min-h-screen">
          <ErrorState code={500} onRetry={reset} />
        </main>
      </body>
    </html>
  )
}
