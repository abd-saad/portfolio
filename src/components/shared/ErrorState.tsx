"use client";

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home, RefreshCw, ShieldAlert, Terminal } from 'lucide-react'

type ErrorCode = 403 | 404 | 500 | 503

type ErrorStateProps = {
  code: ErrorCode
  title?: string
  description?: string
  onRetry?: () => void
}

const copy: Record<ErrorCode, { eyebrow: string; title: string; description: string; hint: string }> = {
  403: {
    eyebrow: 'Access denied',
    title: 'This route is restricted.',
    description: 'You do not have permission to access this resource from the current session.',
    hint: 'auth.policy -> request rejected',
  },
  404: {
    eyebrow: 'Route not found',
    title: 'This endpoint does not exist.',
    description: 'The page may have moved, the URL may be incorrect, or the route was never deployed.',
    hint: 'router.resolve() -> no matching route',
  },
  500: {
    eyebrow: 'Internal error',
    title: 'Something failed unexpectedly.',
    description: 'The application hit an unexpected error. Retry the request or return to a known-good route.',
    hint: 'runtime.execute() -> unexpected exception',
  },
  503: {
    eyebrow: 'Service unavailable',
    title: 'This service is temporarily offline.',
    description: 'A dependency may be unavailable or maintenance may be in progress. Please try again shortly.',
    hint: 'healthcheck -> degraded',
  },
}

export function ErrorState({ code, title, description, onRetry }: ErrorStateProps) {
  const router = useRouter()
  const content = copy[code]
  const Icon = code === 403 ? ShieldAlert : Terminal

  return (
    <section className="error-state section-shell" aria-labelledby="error-title">
      <div className="error-state__glow" aria-hidden="true" />
      <div className="error-state__content">
        <p className="proto-kicker">{content.eyebrow}</p>
        <div className="error-state__code" aria-hidden="true">{code}</div>
        <h1 id="error-title" className="error-state__title">{title ?? content.title}</h1>
        <p className="error-state__description">{description ?? content.description}</p>

        <div className="error-state__actions">
          <Link className="proto-btn proto-btn-primary" href="/">
            <Home size={16} aria-hidden="true" />
            Back home
          </Link>
          {onRetry ? (
            <button className="proto-btn proto-btn-secondary" type="button" onClick={onRetry}>
              <RefreshCw size={16} aria-hidden="true" />
              Try again
            </button>
          ) : (
            <button className="proto-btn proto-btn-secondary" type="button" onClick={() => router.back()}>
              <ArrowLeft size={16} aria-hidden="true" />
              Go back
            </button>
          )}
        </div>
      </div>

      <div className="error-state__terminal" aria-label="Diagnostic summary">
        <div className="error-state__terminal-head">
          <span /><span /><span />
          <strong>request.log</strong>
        </div>
        <div className="error-state__terminal-body">
          <Icon size={18} aria-hidden="true" />
          <code>$ {content.hint}</code>
          <code>status: {code}</code>
          <code>recovery: navigate / or retry</code>
        </div>
      </div>
    </section>
  )
}
