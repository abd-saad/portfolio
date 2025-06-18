import { createClient } from "@/lib/supabase/server";

export const getResumeUrl = async (): Promise<string> => {
  const supabase = await createClient();
  
  const { data } = await supabase.storage
    .from('assets')
    .getPublicUrl('resume.pdf');

  return data.publicUrl;
}