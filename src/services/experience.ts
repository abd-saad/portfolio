import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';

export type Experience = {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
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
      .order('id', { ascending: false });

    if (error || !data) return [];
    return data.map((exp) => ({
      ...exp,
      location: exp.location ?? '',
      period: exp.period ?? '',
      type: exp.type ?? '',
      achievements: Array.isArray(exp.achievements) ? exp.achievements : JSON.parse((exp.achievements as string) ?? '[]'),
      technologies: Array.isArray(exp.technologies) ? exp.technologies : JSON.parse((exp.technologies as string) ?? '[]'),
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
      technologies: Array.isArray(proj.technologies) ? proj.technologies : JSON.parse((proj.technologies as string) ?? '[]'),
      highlights: Array.isArray(proj.highlights) ? proj.highlights : JSON.parse((proj.highlights as string) ?? '[]'),
    }));
  },
  ['projects'],
  { revalidate: 3600, tags: ['projects'] }
);
