import React from 'react';
import { Calendar, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { getExperiences } from '@/services';
import { THomepage } from '@/types';
import { formatExperiencePeriod } from '@/helper/formatExperiencePeriod';

interface ExperienceSectionProps {
  content: THomepage;
}

export const ExperienceSection = async ({ content }: ExperienceSectionProps) => {
  const experiences = await getExperiences();
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="section-shell">
        <div className="max-w-3xl">
          <span className="section-kicker">Career</span>
          <h2 className="section-title mt-5">{content.title}</h2>
          <p className="section-copy mt-5">{content.subtitle}</p>
        </div>

        <div className="relative mt-14 space-y-5 before:absolute before:bottom-8 before:left-[19px] before:top-8 before:w-px before:bg-gradient-to-b before:from-cyan-300/40 before:via-white/10 before:to-transparent sm:before:left-[23px]">
          {experiences.map((exp, index) => {
            const period = formatExperiencePeriod(exp.start, exp.end, exp.period);
            return (
              <article key={exp.id} className="relative pl-14 sm:pl-16">
                <div className="absolute left-0 top-7 grid h-10 w-10 place-items-center rounded-full border border-cyan-300/20 bg-slate-950 text-xs font-bold text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)] sm:h-12 sm:w-12">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="glass-panel rounded-3xl p-6 sm:p-8">
                  <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{exp.company}</p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{exp.title}</h3>
                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                        {exp.location.trim() && <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />{exp.location}</span>}
                        {period.trim() && <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{period}</span>}
                        {exp.type.trim() && <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{exp.type}</span>}
                      </div>
                    </div>

                    <div>
                      {exp.achievements.length > 0 && (
                        <ul className="space-y-3">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {exp.technologies.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span key={i} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};