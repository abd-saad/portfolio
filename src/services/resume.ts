import { createClient } from "@/lib/supabase/server";

export const getResumeUrl = async (filename = "resume.pdf"): Promise<string> => {
  const supabase = await createClient();

  const { data } = supabase.storage
    .from("assets")
    .getPublicUrl(filename);

  if (!data?.publicUrl) {
    throw new Error("Failed to fetch resume public URL from Supabase.");
  }

  return data.publicUrl;
};