import 'server-only';
import { createPublicClient } from '@/lib/supabase/public';
import { unstable_cache } from 'next/cache';
import { captureException } from '@sentry/nextjs';

export type SocialLink = {
  id: string;
  href: string;
  icon: string;
  label: string;
};

const getCachedSocialLinks = unstable_cache(async (): Promise<SocialLink[]> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('social_links')
    .select('*').eq('enabled', true)
    .order('id', { ascending: true });

  if (error) throw new Error('Unable to load social links');
  return data ?? [];
}, ['social-links'], { revalidate: 3600, tags: ['social-links'] });

export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  try {
    return await getCachedSocialLinks();
  } catch {
    captureException(new Error('Unable to load social links'));
    return [];
  }
}; 