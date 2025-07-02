import { createClient } from '@/lib/supabase/server';

export type Certification = {
  id: number;
  name: string;
  provider: string;
  year: string;
  sequence: number;
};

export const getCertifications = async (): Promise<Certification[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('sequence', { ascending: true });

  if (error || !data) return [];
  return data.map((cert) => ({
    ...cert,
    sequence: cert.sequence ?? 0,
  }));
}; 