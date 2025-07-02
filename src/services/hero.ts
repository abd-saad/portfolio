import { createClient } from "@/lib/supabase/server";

export const getProfileImage = async (): Promise<string | null> => {
    const supabase = await createClient();
    const { data } = supabase.storage.from('assets').getPublicUrl('profile.jpg');
    if (!data.publicUrl) return null;
    return data.publicUrl;
};