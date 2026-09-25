import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getSolutionBySlug } from '@/services';
import { isHomepageSectionEnabled } from '@/services/homepage';
import { MarkdownContent } from '@/components/ui/MarkdownContent';

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const enabled = await isHomepageSectionEnabled('solutions');
  if (!enabled) return { title: 'Solutions coming soon | Abdullah Saad' };

  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);

  if (!solution) return { title: 'Solution not found | Abdullah Saad' };

  return {
    title: `${solution.title} | Abdullah Saad`,
    description: solution.excerpt ?? undefined,
  };
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const enabled = await isHomepageSectionEnabled('solutions');
  if (!enabled) redirect('/#solutions');

  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution) notFound();

  return (
    <article className="proto-section pt-10">
      <div className="section-shell">
        <header className="max-w-4xl border-b border-[var(--line)] pb-10">
          <p className="proto-kicker">{solution.category ?? 'Solution Case Study'}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-.045em] text-[var(--text)] md:text-6xl">{solution.title}</h1>
          {solution.excerpt && <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg">{solution.excerpt}</p>}

          {solution.technologies.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {solution.technologies.map((technology) => (
                <span key={technology.id} className="rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1.5 text-xs font-semibold text-[var(--muted)]">
                  {technology.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {solution.architecture_image_url && (
          <div className="mt-10 overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-3">
            <img src={solution.architecture_image_url} alt={`${solution.title} architecture`} className="h-auto w-full rounded-[14px]" />
          </div>
        )}

        <div className="mt-12 grid gap-12">
          {solution.sections.map((section) => (
            <section key={section.id} className="grid gap-4 border-b border-[var(--line)] pb-10 md:grid-cols-[220px_1fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.08em] text-[var(--muted-2)]">{section.section_type}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-.03em] text-[var(--text)]">{section.title}</h2>
              </div>
              <MarkdownContent content={section.content} />
            </section>
          ))}
        </div>

        {(solution.github_url || solution.demo_url) && (
          <footer className="mt-10 flex flex-wrap gap-5 text-sm font-bold">
            {solution.github_url && <a href={solution.github_url} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)]">GitHub ↗</a>}
            {solution.demo_url && <a href={solution.demo_url} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)]">Live demo ↗</a>}
          </footer>
        )}
      </div>
    </article>
  );
}
