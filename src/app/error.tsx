"use client";

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import { ErrorState } from '@/components/shared'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return <ErrorState code={500} onRetry={reset} />
}
