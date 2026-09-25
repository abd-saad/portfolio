import 'server-only';
import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import { THomepage, THomepageEnum } from '@/types/homepage';

export const getHomepage = unstable_cache(
  async (): Promise<THomepage[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('home_sections')
      .select('*')
      .order('sequence', { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  },
  ['homepage'],
  { revalidate: 3600, tags: ['homepage'] }
);

export const isHomepageSectionEnabled = async (sectionType: THomepageEnum) => {
  const homepage = await getHomepage();
  return homepage.some(
    (section) => section.section_type === sectionType && section.enabled === true
  );
};
