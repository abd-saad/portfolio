import { createClient } from '@/lib/supabase/client';

export type SocialLink = {
  id: string;
  href: string;
  icon: string;
  label: string;
};

export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .order('id', { ascending: true });

  if (error || !data) return [];
  return data;
}; 