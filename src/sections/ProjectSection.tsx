import { getProjects } from "@/services";
import { THomepage } from "@/types";

interface ProjectSectionProps {
  content: THomepage;
}

export const ProjectSection = async ({ content }: ProjectSectionProps) => {
  const projects = await getProjects();
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="proto-section">
      <div className="section-shell">
        <div className="proto-section-head">
          <div>
            <p className="proto-kicker">03 / Projects</p>
            <h2 className="proto-title">{content.title}</h2>
          </div>
          <p className="proto-intro">{content.subtitle}</p>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article key={project.id} className="flex min-h-[310px] flex-col rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-[23px] transition hover:-translate-y-1 hover:border-[var(--line-strong)]">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[.08em] text-[var(--muted-2)]">
                <span>Project {String(index + 1).padStart(2, '0')}</span>
                <span className="h-[7px] w-[7px] rounded-full bg-[var(--accent)] opacity-80" />
              </div>

              <h3 className="mt-7 text-xl font-semibold tracking-[-.03em] text-[var(--text)]">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.description}</p>

              {project.highlights.length > 0 && (
                <ul className="mt-5 grid list-none gap-2 p-0">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="relative pl-4 text-sm leading-6 text-[var(--muted)] before:absolute before:left-0 before:top-[.72em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--accent)] before:opacity-75">
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-2 py-1 text-[11px] font-semibold text-[var(--muted)]">{tech}</span>
                  ))}
                </div>

                {(project.github || project.demo) && (
                  <div className="mt-5 flex gap-4 border-t border-[var(--line)] pt-4 text-[13px] font-bold">
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)]">GitHub ↗</a>}
                    {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)]">Live demo ↗</a>}
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