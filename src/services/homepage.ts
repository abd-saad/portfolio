import { createClient } from "@/lib/supabase/server";
import { THomepage } from "@/types/homepage";

export const getHomepage = async (): Promise<THomepage[]> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("home_sections")
      .select("*")
      .is("enabled", true)
      .order("sequence", { ascending: true });

    if (error) throw error;
    return data ?? [];
  } catch (error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Failed to fetch homepage content:", error);
    }
    throw new Error(
      typeof error === "object" && error && "message" in error
        ? (error as { message?: string }).message || "Unknown error"
        : "Supabase fetch failed"
    );
  }
};