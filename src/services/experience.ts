import 'server-only';
import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import { captureException } from '@sentry/nextjs';
import { normalizeStringArray } from '@/helper/normalizeStringArray';

export type Experience = {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  start: string | null;
  end: string | null;
  type: string;
  achievements: string[];
  technologies: string[];
};

export type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  github: string;
  demo: string;
  sequence: number;
};

export const getExperiences = unstable_cache(
  async (): Promise<Experience[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('end', { ascending: false });

    if (error) {
      const failure = new Error('Failed to load experiences', { cause: error });
      captureException(failure);
      throw failure;
    }
    return (data ?? []).map((exp) => ({
      ...exp,
      location: exp.location ?? '',
      period: exp.period ?? '',
      type: exp.type ?? '',
      achievements: normalizeStringArray(exp.achievements),
      technologies: normalizeStringArray(exp.technologies),
    }));
  },
  ['experiences'],
  { revalidate: 3600, tags: ['experiences'] }
);

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sequence', { ascending: true });

    if (error || !data) return [];
    return data.map((proj) => ({
      ...proj,
      description: proj.description ?? '',
      sequence: proj.sequence ?? 0,
      github: proj.github ?? '',
      demo: proj.demo ?? '',
      technologies: normalizeStringArray(proj.technologies),
      highlights: normalizeStringArray(proj.highlights),
    }));
  },
  ['projects'],
  { revalidate: 3600, tags: ['projects'] }
);
