import Link from 'next/link';
import { getFeaturedSolutions } from '@/services';
import { THomepage } from '@/types';

interface SolutionsSectionProps {
  content: THomepage;
}

export const SolutionsSection = async ({ content }: SolutionsSectionProps) => {
  const solutions = await getFeaturedSolutions(3);
  if (solutions.length === 0) return null;

  return (
    <section id="solutions" className="proto-section">
      <div className="section-shell">
        <div className="proto-section-head">
          <div>
            <p className="proto-kicker">04 / Solutions</p>
            <h2 className="proto-title">{content.title}</h2>
          </div>
          <p className="proto-intro">{content.subtitle}</p>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <article key={solution.id} className="flex min-h-[300px] flex-col rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-[23px] transition hover:-translate-y-1 hover:border-[var(--line-strong)]">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[.08em] text-[var(--muted-2)]">
                <span>{solution.category ?? `Solution ${String(index + 1).padStart(2, '0')}`}</span>
                <span className="h-[7px] w-[7px] rounded-full bg-[var(--accent)] opacity-80" />
              </div>

              <h3 className="mt-7 text-xl font-semibold tracking-[-.03em] text-[var(--text)]">{solution.title}</h3>
              {solution.excerpt && <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{solution.excerpt}</p>}

              <div className="mt-auto border-t border-[var(--line)] pt-5">
                <Link href={`/solutions/${solution.slug}`} className="text-[13px] font-bold text-[var(--text)] hover:text-[var(--accent)]">
                  View case study →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-right">
          <Link href="/solutions" className="text-sm font-bold text-[var(--text)] hover:text-[var(--accent)]">
            View all solutions →
          </Link>
        </div>
      </div>
    </section>
  );
};
