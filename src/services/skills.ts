import { createClient } from '@/lib/supabase/server';

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

export const getSkillCategoriesWithSkills = async (): Promise<SkillCategoryWithSkills[]> => {
  const supabase = await createClient();

  // Fetch categories
  const { data: categories, error: catError } = await supabase
    .from('skill_categories')
    .select('*')
    .order('id', { ascending: true });

  if (catError || !categories) return [];

  // Fetch skills
  const { data: skills, error: skillError } = await supabase
    .from('skills')
    .select('*')
    .eq('enabled', true)

  if (skillError || !skills) return categories.map(cat => ({ ...cat, skills: [] }));

  // Group skills by category
  return categories.map(cat => ({
    ...cat,
    skills: skills.filter(skill => skill.category_id === cat.id),
  }));
}; 