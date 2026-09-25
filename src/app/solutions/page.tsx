import type { Metadata } from 'next';
import Link from 'next/link';
import { getSolutions } from '@/services';

export const metadata: Metadata = {
  title: 'Solutions | Abdullah Saad',
  description: 'Architecture and infrastructure case studies focused on reliability, scalability, observability, and production trade-offs.',
};

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return (
    <section className="proto-section pt-10">
      <div className="section-shell">
        <div className="proto-section-head">
          <div>
            <p className="proto-kicker">Architecture / Case Studies</p>
            <h1 className="proto-title">Solutions</h1>
          </div>
          <p className="proto-intro">
            Production-oriented architecture scenarios covering cloud, Kubernetes, databases, observability, resilience, and engineering trade-offs.
          </p>
        </div>

        {solutions.length === 0 ? (
          <div className="rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-8 text-sm leading-6 text-[var(--muted)]">
            Case studies are being prepared and will appear here once published.
          </div>
        ) : (
          <div className="grid gap-3.5 md:grid-cols-2">
            {solutions.map((solution) => (
              <article key={solution.id} className="flex min-h-[280px] flex-col rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-[24px] transition hover:-translate-y-1 hover:border-[var(--line-strong)]">
                <div className="text-[11px] font-bold uppercase tracking-[.08em] text-[var(--muted-2)]">
                  {solution.category ?? 'Architecture'}
                </div>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-.035em] text-[var(--text)]">{solution.title}</h2>
                {solution.excerpt && <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{solution.excerpt}</p>}
                <div className="mt-auto border-t border-[var(--line)] pt-5">
                  <Link href={`/solutions/${solution.slug}`} className="text-sm font-bold text-[var(--text)] hover:text-[var(--accent)]">
                    View case study →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
