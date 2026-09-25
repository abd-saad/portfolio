import React from 'react';
import { getSkillCategoriesWithSkills } from '@/services';
import { THomepage } from '@/types';

interface SkillsSectionProps {
  content: THomepage;
}

function getLevelLabel(level: string | null | undefined) {
  if (!level) return 'Not Rated';
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export const SkillsSection = async ({ content }: SkillsSectionProps) => {
  const categories = await getSkillCategoriesWithSkills();

  return (
    <section id="skills" className="proto-section">
      <div className="section-shell">
        <div className="proto-section-head">
          <div>
            <p className="proto-kicker">01 / Expertise</p>
            <h2 className="proto-title">{content.title}</h2>
          </div>
          <p className="proto-intro">{content.subtitle}</p>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <article key={category.id} className="min-h-[210px] rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-[23px] transition hover:-translate-y-1 hover:border-[var(--line-strong)] hover:bg-[linear-gradient(160deg,var(--surface),var(--surface-2))]">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[.08em] text-[var(--muted-2)]">
                <span>{category.type || `Category ${index + 1}`}</span>
                <span className="h-[7px] w-[7px] rounded-full bg-[var(--accent)] opacity-80" />
              </div>

              <h3 className="mb-[15px] mt-[30px] text-lg font-semibold tracking-[-.025em] text-[var(--text)]">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill.id} className="rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-[9px] py-1.5 text-xs text-[var(--muted)]">
                    <strong className="font-semibold text-[var(--text)]">{skill.name}</strong> · {getLevelLabel(skill.level)}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};