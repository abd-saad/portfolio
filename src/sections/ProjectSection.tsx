import { getProjects } from "@/services";
import { THomepage } from "@/types";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";

interface ProjectSectionProps {
  content: THomepage;
}

export const ProjectSection = async ({ content }: ProjectSectionProps) => {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="section-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="section-kicker">Selected work</span>
            <h2 className="section-title mt-5">{content.title}</h2>
            <p className="section-copy mt-5">{content.subtitle}</p>
          </div>
          <div className="hidden items-center gap-2 text-sm text-slate-500 lg:flex">
            <Sparkles className="h-4 w-4 text-violet-300" />
            Built around measurable outcomes
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article key={project.id} className="glass-panel card-hover group flex min-h-[360px] flex-col rounded-3xl p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-slate-600">PROJECT / {String(index + 1).padStart(2, '0')}</span>
                <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
              </div>

              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p>

              {project.highlights.length > 0 && (
                <ul className="mt-6 space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-8">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-400">{tech}</span>
                  ))}
                </div>

                {(project.github || project.demo) && (
                  <div className="mt-6 flex items-center gap-4 border-t border-white/[0.06] pt-5 text-sm font-medium">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-300 transition hover:text-white">
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-300 transition hover:text-cyan-200">
                        Live demo <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};