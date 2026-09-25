'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3500);
      } else {
        setErrorMsg('Failed to send message. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected error occurred. Please try again.');
    }

    setIsSubmitting(false);
  };

  const fieldClassName = 'w-full rounded-[13px] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3.5 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--muted-2)] focus:border-[color-mix(in_srgb,var(--accent)_65%,var(--line))] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--accent)_10%,transparent)]';

  if (isSubmitted) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-[color-mix(in_srgb,var(--accent)_30%,var(--line))] bg-[color-mix(in_srgb,var(--accent)_12%,var(--surface))] text-[var(--accent)] shadow-[0_12px_32px_color-mix(in_srgb,var(--accent)_14%,transparent)]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[.12em] text-[var(--accent)]">Message sent</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-.035em] text-[var(--text)]">Thanks for reaching out.</h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--muted)]">
          Your message is on its way. I&apos;ll get back to you as soon as possible, typically within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-1 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[var(--muted-2)]">Start a conversation</p>
          <h3 className="mt-1.5 text-xl font-semibold tracking-[-.03em] text-[var(--text)]">Tell me what you&apos;re working on.</h3>
        </div>
        <div className="hidden h-10 w-10 place-items-center rounded-[12px] border border-[var(--line)] bg-[var(--surface-2)] text-[var(--accent)] sm:grid">
          <Send className="h-4 w-4" />
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-start gap-3 rounded-[13px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-semibold text-[var(--muted)]">
            Full name <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={fieldClassName}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-semibold text-[var(--muted)]">
            Email <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={fieldClassName}
            placeholder="john@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-2 block text-xs font-semibold text-[var(--muted)]">
          Company / organization <span className="font-medium text-[var(--muted-2)]">optional</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={fieldClassName}
          placeholder="Your company"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label htmlFor="message" className="block text-xs font-semibold text-[var(--muted)]">
            Project details <span className="text-[var(--accent)]">*</span>
          </label>
          <span className="text-[10px] font-medium text-[var(--muted-2)]">A few lines is enough</span>
        </div>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className={`${fieldClassName} min-h-[150px] resize-y`}
          placeholder="What are you building, improving, or trying to solve?"
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex min-h-12 w-full items-center justify-between rounded-[14px] border border-[color-mix(in_srgb,var(--accent)_40%,var(--line))] bg-[var(--accent)] px-4 py-3 text-sm font-bold text-[var(--bg)] shadow-[0_10px_30px_color-mix(in_srgb,var(--accent)_16%,transparent)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_color-mix(in_srgb,var(--accent)_22%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
        >
          <span className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[color-mix(in_srgb,var(--bg)_14%,transparent)]">
              {isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </span>
            <span>{isSubmitting ? 'Sending message…' : 'Send message'}</span>
          </span>
          {!isSubmitting && <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
        </button>

        <p className="mt-2.5 text-center text-[11px] leading-5 text-[var(--muted-2)]">
          No spam or mailing list. Just a direct reply to your message.
        </p>
      </div>
    </form>
  );
};
