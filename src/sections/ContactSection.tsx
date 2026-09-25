import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { ContactForm, SocialLinks } from '@/components/ui';
import { THomepage } from '@/types';

interface ContactSectionProps {
  content: THomepage;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ content }) => {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="section-shell">
        <div className="glass-panel overflow-hidden rounded-[2rem]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/[0.08] via-transparent to-violet-500/[0.08]" />
              <div className="relative z-10">
                <span className="section-kicker">Contact</span>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{content.title}</h2>
                <p className="section-copy mt-5">{content.subtitle}</p>

                <div className="mt-9 rounded-2xl border border-white/10 bg-black/10 p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Open to meaningful opportunities</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">Infrastructure, platform engineering, cloud architecture, automation, and DevOps consulting.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Elsewhere</p>
                  <SocialLinks />
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs font-medium text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.7)]" />
                  Available for new projects
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>

            <div className="bg-slate-950/30 p-7 sm:p-10 lg:p-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};