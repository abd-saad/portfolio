import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/services';

export const metadata: Metadata = {
  title: 'Blog | Abdullah Saad',
  description: 'Technical notes and lessons on cloud infrastructure, Kubernetes, databases, observability, SRE, and production engineering.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="proto-section pt-10">
      <div className="section-shell">
        <div className="proto-section-head">
          <div>
            <p className="proto-kicker">Engineering Notes</p>
            <h1 className="proto-title">Blog</h1>
          </div>
          <p className="proto-intro">
            Notes from operating cloud infrastructure, Kubernetes platforms, databases, observability stacks, and production systems.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-8 text-sm leading-6 text-[var(--muted)]">
            Articles are being prepared and will appear here once published.
          </div>
        ) : (
          <div className="grid gap-3.5 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.id} className="flex min-h-[260px] flex-col rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-[24px] transition hover:-translate-y-1 hover:border-[var(--line-strong)]">
                <div className="text-[11px] font-bold uppercase tracking-[.08em] text-[var(--muted-2)]">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Article'}
                </div>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-.035em] text-[var(--text)]">{post.title}</h2>
                {post.excerpt && <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{post.excerpt}</p>}
                <div className="mt-auto border-t border-[var(--line)] pt-5">
                  <Link href={`/blog/${post.slug}`} className="text-sm font-bold text-[var(--text)] hover:text-[var(--accent)]">
                    Read article →
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
