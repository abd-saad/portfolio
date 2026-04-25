import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';

export type Certification = {
  credential_id: string | null
  credential_url: string | null
  id: number
  name: string
  provider: string
  sequence: number | null
  valid_from: string | null
  valid_until: string | null
  badge_image_url: string | null
};

export const getCertifications = unstable_cache(
  async (): Promise<Certification[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('sequence', { ascending: true });

    if (error || !data) return [];
    return data.map((cert) => ({
      ...cert,
      sequence: cert.sequence ?? 0,
    }));
  },
  ['certifications'],
  { revalidate: 3600, tags: ['certifications'] }
);
