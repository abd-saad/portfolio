import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';

export type SkillCategoryWithSkills = {
  id: number;
  title: string | null;
  type: string | null;
  skills: {
    id: number;
    name: string | null;
    level: string | null;
  }[];
};

export const getSkillCategoriesWithSkills = unstable_cache(
  async (): Promise<SkillCategoryWithSkills[]> => {
    const supabase = createPublicClient();

    const { data: categories, error: catError } = await supabase
      .from('skill_categories')
      .select('*')
      .order('id', { ascending: true });

    if (catError || !categories) return [];

    const { data: skills, error: skillError } = await supabase
      .from('skills')
      .select('*')
      .eq('enabled', true);

    if (skillError || !skills) return categories.map((cat) => ({ ...cat, skills: [] }));

    return categories.map((cat) => ({
      ...cat,
      skills: skills.filter((skill) => skill.category_id === cat.id),
    }));
  },
  ['skills'],
  { revalidate: 3600, tags: ['skills'] }
);
