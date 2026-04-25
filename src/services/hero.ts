import { createPublicClient } from '@/lib/supabase/public';

export const getProfileImage = (): string => {
  const supabase = createPublicClient();
  const { data } = supabase.storage.from('assets').getPublicUrl('profile.jpg');
  return data.publicUrl;
};
