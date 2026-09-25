import React from 'react';
import { ContactForm, SocialLinks } from '@/components/ui';
import { THomepage } from '@/types';

interface ContactSectionProps {
  content: THomepage;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ content }) => {
  return (
    <section id="contact" className="proto-section">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[32px] border border-[var(--line)] bg-[linear-gradient(145deg,var(--surface),var(--surface-2))] p-7 shadow-[var(--shadow)] sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-start">
            <div>
              <p className="proto-kicker">05 / Contact</p>
              <h2 className="mt-3 max-w-[760px] text-[clamp(36px,6vw,68px)] font-[760] leading-none tracking-[-.055em] text-[var(--text)]">{content.title}</h2>
              <p className="mt-[18px] max-w-[620px] text-[var(--muted)]">{content.subtitle}</p>

              <p className="mt-6 max-w-[620px] leading-7 text-[var(--muted)]">
                I&apos;m always interested in discussing new opportunities, whether it&apos;s optimizing existing infrastructure, building new cloud architectures, or consulting on DevOps best practices.
              </p>

              <div className="mt-7">
                <SocialLinks />
              </div>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent)]" />
                Available for new projects and opportunities
              </div>
            </div>

            <div className="rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};