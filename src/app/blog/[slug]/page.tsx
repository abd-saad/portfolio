import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/services';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return { title: 'Article not found | Abdullah Saad' };

  return {
    title: post.meta_title ?? `${post.title} | Abdullah Saad`,
    description: post.meta_description ?? post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="proto-section pt-10">
      <div className="section-shell">
        <header className="mx-auto max-w-4xl border-b border-[var(--line)] pb-10">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[.08em] text-[var(--muted-2)]">
            {post.categories.map((category) => (
              <span key={category.id}>{category.name}</span>
            ))}
            {post.published_at && (
              <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-.045em] text-[var(--text)] md:text-6xl">{post.title}</h1>
          {post.excerpt && <p className="mt-5 text-base leading-7 text-[var(--muted)] md:text-lg">{post.excerpt}</p>}
        </header>

        {post.cover_image_url && (
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-3">
            <img src={post.cover_image_url} alt={post.title ?? 'Blog cover'} className="h-auto w-full rounded-[14px]" />
          </div>
        )}

        <div className="mx-auto mt-12 max-w-3xl whitespace-pre-wrap text-[15px] leading-8 text-[var(--muted)] md:text-base">
          {post.content}
        </div>
      </div>
    </article>
  );
}
