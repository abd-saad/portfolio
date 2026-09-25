import 'server-only';
import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Tables } from '@/types/supabase';

export type PublishedSolution = Tables<'published_solutions'>;
export type SolutionSection = Tables<'solution_sections'>;
export type Technology = Tables<'technologies'>;

export type SolutionDetail = PublishedSolution & {
  sections: SolutionSection[];
  technologies: Technology[];
};

export const getFeaturedSolutions = unstable_cache(
  async (limit = 3): Promise<PublishedSolution[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('published_solutions')
      .select('*')
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data;
  },
  ['featured-solutions'],
  { revalidate: 3600, tags: ['solutions'] }
);

export const getSolutions = unstable_cache(
  async (): Promise<PublishedSolution[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('published_solutions')
      .select('*')
      .order('published_at', { ascending: false });

    if (error || !data) return [];
    return data;
  },
  ['solutions'],
  { revalidate: 3600, tags: ['solutions'] }
);

export async function getSolutionBySlug(slug: string): Promise<SolutionDetail | null> {
  const supabase = createPublicClient();

  const { data: solution, error: solutionError } = await supabase
    .from('published_solutions')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (solutionError || !solution?.id) return null;

  const [{ data: sections, error: sectionsError }, { data: links, error: linksError }] =
    await Promise.all([
      supabase
        .from('solution_sections')
        .select('*')
        .eq('solution_id', solution.id)
        .order('position', { ascending: true }),
      supabase
        .from('solution_technologies')
        .select('technologies(*)')
        .eq('solution_id', solution.id),
    ]);

  if (sectionsError || linksError) return null;

  const technologies =
    links
      ?.map((item) => item.technologies)
      .filter((item): item is Technology => Boolean(item)) ?? [];

  return {
    ...solution,
    sections: sections ?? [],
    technologies,
  };
}
