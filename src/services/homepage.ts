import { createClient } from "@/lib/supabase/server";
import { THomepage } from "@/types/homepage";

export const getHomepage = async (): Promise<THomepage[]> => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("home_sections")
    .select("*")
    .is("enabled", true)
    .order("sequence", { ascending: true });

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to fetch homepage content:', error);
    }
    throw new Error(`Supabase fetch failed: ${error.message}`);
  }

  return data ?? [];
}