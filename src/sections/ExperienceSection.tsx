import React from 'react';
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
    <section id="experience" className="proto-section">
      <div className="section-shell">
        <div className="proto-section-head">
          <div>
            <p className="proto-kicker">02 / Experience</p>
            <h2 className="proto-title">{content.title}</h2>
          </div>
          <p className="proto-intro">{content.subtitle}</p>
        </div>

        <div className="border-t border-[var(--line)]">
          {experiences.map((exp) => {
            const period = formatExperiencePeriod(exp.start, exp.end, exp.period);
            return (
              <article key={exp.id} className="grid gap-4 border-b border-[var(--line)] py-9 lg:grid-cols-[250px_1fr] lg:gap-11">
                <div>
                  {period.trim() && <div className="text-[13px] font-bold text-[var(--text)]">{period}</div>}
                  {exp.location.trim() && <div className="mt-[7px] text-[13px] text-[var(--muted)]">{exp.location}</div>}
                  {exp.type.trim() && <span className="mt-[13px] inline-block rounded-[7px] border border-[var(--line)] px-2 py-1 text-[11px] text-[var(--muted-2)]">{exp.type}</span>}
                </div>

                <div>
                  <h3 className="m-0 text-[26px] font-semibold tracking-[-.035em] text-[var(--text)]">{exp.title}</h3>
                  <div className="mt-1 text-[13px] font-bold text-[var(--accent)]">{exp.company}</div>

                  {exp.achievements.length > 0 && (
                    <ul className="mt-5 grid list-none gap-2.5 p-0">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="relative pl-5 text-[var(--muted)] before:absolute before:left-0.5 before:top-[.72em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--accent)] before:opacity-75">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-[7px]">
                      {exp.technologies.map((tech, index) => (
                        <span key={index} className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2 py-1 text-[11px] font-semibold text-[var(--muted)]">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};