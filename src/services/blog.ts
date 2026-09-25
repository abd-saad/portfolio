import 'server-only';
import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Tables } from '@/types/supabase';

export type PublishedBlogPost = Tables<'published_blog_posts'>;
export type BlogCategory = Tables<'blog_categories'>;

export type BlogPostDetail = PublishedBlogPost & {
  categories: BlogCategory[];
};

export const getLatestBlogPosts = unstable_cache(
  async (limit = 3): Promise<PublishedBlogPost[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('published_blog_posts')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data;
  },
  ['latest-blog-posts'],
  { revalidate: 3600, tags: ['blog'] }
);

export const getBlogPosts = unstable_cache(
  async (): Promise<PublishedBlogPost[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('published_blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error || !data) return [];
    return data;
  },
  ['blog-posts'],
  { revalidate: 3600, tags: ['blog'] }
);

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const supabase = createPublicClient();

  const { data: post, error: postError } = await supabase
    .from('published_blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (postError || !post?.id) return null;

  const { data: links, error: linksError } = await supabase
    .from('blog_post_categories')
    .select('blog_categories(*)')
    .eq('blog_post_id', post.id);

  if (linksError) return null;

  const categories =
    links
      ?.map((item) => item.blog_categories)
      .filter((item): item is BlogCategory => Boolean(item)) ?? [];

  return {
    ...post,
    categories,
  };
}
