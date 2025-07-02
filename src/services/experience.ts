import { createClient } from '@/lib/supabase/server';

export type Experience = {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
  metrics: Record<string, string>;
  sequence: number;
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

export const getExperiences = async (): Promise<Experience[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('sequence', { ascending: true });

  if (error || !data) return [];
  // Parse JSON fields
  return data.map((exp) => ({
    ...exp,
    location: exp.location ?? '',
    period: exp.period ?? '',
    type: exp.type ?? '',
    description: exp.description ?? '',
    sequence: exp.sequence ?? 0,
    achievements: Array.isArray(exp.achievements) ? exp.achievements : JSON.parse(exp.achievements as string),
    technologies: Array.isArray(exp.technologies) ? exp.technologies : JSON.parse(exp.technologies as string),
    metrics: typeof exp.metrics === 'object' ? exp.metrics : JSON.parse(exp.metrics as string),
  }));
};

export const getProjects = async (): Promise<Project[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sequence', { ascending: true });

  if (error || !data) return [];
  // Parse JSON fields
  return data.map((proj) => ({
    ...proj,
    description: proj.description ?? '',
    sequence: proj.sequence ?? 0,
    github: proj.github ?? '',
    demo: proj.demo ?? '',
    technologies: Array.isArray(proj.technologies) ? proj.technologies : JSON.parse(proj.technologies as string),
    highlights: Array.isArray(proj.highlights) ? proj.highlights : JSON.parse(proj.highlights as string),
  }));
}; 