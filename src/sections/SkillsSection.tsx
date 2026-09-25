import React from 'react';
import { getSkillCategoriesWithSkills } from '@/services';
import { Cloud, Container, Code, GitBranch, Monitor, Shield, ArrowUpRight } from 'lucide-react';
import { THomepage } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  cloud: Cloud,
  containerization: Container,
  iac: Code,
  version_control: GitBranch,
  monitoring: Monitor,
  security: Shield,
};

interface SkillsSectionProps {
  content: THomepage;
}

export const SkillsSection = async ({ content }: SkillsSectionProps) => {
  const categories = await getSkillCategoriesWithSkills();

  function getSkillLevelProps(level: string | null | undefined) {
    switch (level) {
      case 'beginner':
        return { label: 'Beginner', className: 'border-amber-300/20 bg-amber-300/10 text-amber-200' };
      case 'intermediate':
        return { label: 'Intermediate', className: 'border-sky-300/20 bg-sky-300/10 text-sky-200' };
      case 'advanced':
        return { label: 'Advanced', className: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200' };
      default:
        return { label: 'Not Rated', className: 'border-white/10 bg-white/5 text-slate-400' };
    }
  }

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="section-kicker">Expertise</span>
            <h2 className="section-title mt-5">{content.title}</h2>
            <p className="section-copy mt-5 max-w-xl">{content.subtitle}</p>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
              <span className="h-px w-12 bg-gradient-to-r from-cyan-300/70 to-transparent" />
              Built for production, not demos
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((category, categoryIndex) => {
              const Icon = iconMap[category.type || ''] || Code;
              return (
                <article
                  key={category.id}
                  className="glass-panel card-hover group rounded-3xl p-6 sm:p-7"
                  style={{ animationDelay: `${categoryIndex * 80}ms` }}
                >
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-white">{category.title}</h3>

                  <div className="mt-5 space-y-3">
                    {category.skills.map((skill) => {
                      const level = getSkillLevelProps(skill.level);
                      return (
                        <div key={skill.id} className="flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3 first:border-t-0 first:pt-0">
                          <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${level.className}`}>
                            {level.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};