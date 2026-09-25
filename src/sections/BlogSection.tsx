import Link from 'next/link';
import { getLatestBlogPosts } from '@/services';
import { THomepage } from '@/types';

interface BlogSectionProps {
  content: THomepage;
}

export const BlogSection = async ({ content }: BlogSectionProps) => {
  const posts = await getLatestBlogPosts(3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="proto-section">
      <div className="section-shell">
        <div className="proto-section-head">
          <div>
            <p className="proto-kicker">06 / Writing</p>
            <h2 className="proto-title">{content.title}</h2>
          </div>
          <p className="proto-intro">{content.subtitle}</p>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex min-h-[280px] flex-col rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-[23px] transition hover:-translate-y-1 hover:border-[var(--line-strong)]">
              <div className="text-[11px] font-bold uppercase tracking-[.08em] text-[var(--muted-2)]">
                {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Article'}
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-[-.03em] text-[var(--text)]">{post.title}</h3>
              {post.excerpt && <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{post.excerpt}</p>}

              <div className="mt-auto border-t border-[var(--line)] pt-5">
                <Link href={`/blog/${post.slug}`} className="text-[13px] font-bold text-[var(--text)] hover:text-[var(--accent)]">
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-right">
          <Link href="/blog" className="text-sm font-bold text-[var(--text)] hover:text-[var(--accent)]">
            View all writing →
          </Link>
        </div>
      </div>
    </section>
  );
};
