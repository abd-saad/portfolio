import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import { THomepage } from '@/types/homepage';

export const getHomepage = unstable_cache(
  async (): Promise<THomepage[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('home_sections')
      .select('*')
      .is('enabled', true)
      .order('sequence', { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  },
  ['homepage'],
  { revalidate: 3600, tags: ['homepage'] }
);
