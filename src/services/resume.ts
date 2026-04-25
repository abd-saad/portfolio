import { createPublicClient } from '@/lib/supabase/public';

export const getResumeUrl = (filename = 'resume.pdf'): string => {
  const supabase = createPublicClient();
  const { data } = supabase.storage.from('assets').getPublicUrl(filename);
  if (!data?.publicUrl) throw new Error('Failed to fetch resume public URL from Supabase.');
  return data.publicUrl;
};
