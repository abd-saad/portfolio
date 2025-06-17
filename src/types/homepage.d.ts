import { Database } from "./supabase";

export type THomepage = Partial<Database["public"]["Tables"]["home_sections"]["Row"]>;
export type THomepageEnum = Database["public"]["Enums"]["section_name"];