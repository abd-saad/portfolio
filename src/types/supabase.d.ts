export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_post_categories: {
        Row: {
          blog_post_id: string
          category_id: string
        }
        Insert: {
          blog_post_id: string
          category_id: string
        }
        Update: {
          blog_post_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_categories_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_categories_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "published_blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          featured: boolean
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          badge_image_url: string | null
          credential_id: string | null
          credential_url: string | null
          id: number
          name: string
          provider: string
          sequence: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          badge_image_url?: string | null
          credential_id?: string | null
          credential_url?: string | null
          id?: number
          name: string
          provider: string
          sequence?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          badge_image_url?: string | null
          credential_id?: string | null
          credential_url?: string | null
          id?: number
          name?: string
          provider?: string
          sequence?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      experiences: {
        Row: {
          achievements: Json | null
          company: string
          end: string | null
          id: number
          location: string | null
          period: string | null
          start: string | null
          technologies: Json | null
          title: string
          type: string | null
        }
        Insert: {
          achievements?: Json | null
          company: string
          end?: string | null
          id?: number
          location?: string | null
          period?: string | null
          start?: string | null
          technologies?: Json | null
          title: string
          type?: string | null
        }
        Update: {
          achievements?: Json | null
          company?: string
          end?: string | null
          id?: number
          location?: string | null
          period?: string | null
          start?: string | null
          technologies?: Json | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      home_sections: {
        Row: {
          enabled: boolean | null
          id: number
          section_type: Database["public"]["Enums"]["section_name"]
          sequence: number
          subtitle: string | null
          title: string | null
        }
        Insert: {
          enabled?: boolean | null
          id?: number
          section_type: Database["public"]["Enums"]["section_name"]
          sequence: number
          subtitle?: string | null
          title?: string | null
        }
        Update: {
          enabled?: boolean | null
          id?: number
          section_type?: Database["public"]["Enums"]["section_name"]
          sequence?: number
          subtitle?: string | null
          title?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          demo: string | null
          description: string | null
          github: string | null
          highlights: Json | null
          id: number
          sequence: number | null
          technologies: Json | null
          title: string
        }
        Insert: {
          demo?: string | null
          description?: string | null
          github?: string | null
          highlights?: Json | null
          id?: number
          sequence?: number | null
          technologies?: Json | null
          title: string
        }
        Update: {
          demo?: string | null
          description?: string | null
          github?: string | null
          highlights?: Json | null
          id?: number
          sequence?: number | null
          technologies?: Json | null
          title?: string
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          id: number
          title: string | null
          type: Database["public"]["Enums"]["skills_type"] | null
        }
        Insert: {
          id?: number
          title?: string | null
          type?: Database["public"]["Enums"]["skills_type"] | null
        }
        Update: {
          id?: number
          title?: string | null
          type?: Database["public"]["Enums"]["skills_type"] | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category_id: number | null
          enabled: boolean | null
          id: number
          level: Database["public"]["Enums"]["level"] | null
          name: string | null
        }
        Insert: {
          category_id?: number | null
          enabled?: boolean | null
          id?: number
          level?: Database["public"]["Enums"]["level"] | null
          name?: string | null
        }
        Update: {
          category_id?: number | null
          enabled?: boolean | null
          id?: number
          level?: Database["public"]["Enums"]["level"] | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      social_links: {
        Row: {
          enabled: boolean
          href: string
          icon: string
          id: string
          label: Database["public"]["Enums"]["social_label"]
        }
        Insert: {
          enabled?: boolean
          href: string
          icon: string
          id?: string
          label: Database["public"]["Enums"]["social_label"]
        }
        Update: {
          enabled?: boolean
          href?: string
          icon?: string
          id?: string
          label?: Database["public"]["Enums"]["social_label"]
        }
        Relationships: []
      }
      solution_sections: {
        Row: {
          content: string | null
          created_at: string
          data: Json
          id: string
          position: number
          section_type: string
          solution_id: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          data?: Json
          id?: string
          position?: number
          section_type?: string
          solution_id: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          data?: Json
          id?: string
          position?: number
          section_type?: string
          solution_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "solution_sections_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "published_solutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solution_sections_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "solutions"
            referencedColumns: ["id"]
          },
        ]
      }
      solution_technologies: {
        Row: {
          solution_id: string
          technology_id: string
        }
        Insert: {
          solution_id: string
          technology_id: string
        }
        Update: {
          solution_id?: string
          technology_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "solution_technologies_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "published_solutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solution_technologies_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "solutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solution_technologies_technology_id_fkey"
            columns: ["technology_id"]
            isOneToOne: false
            referencedRelation: "technologies"
            referencedColumns: ["id"]
          },
        ]
      }
      solutions: {
        Row: {
          architecture_image_url: string | null
          category: string | null
          cover_image_url: string | null
          created_at: string
          demo_url: string | null
          excerpt: string | null
          featured: boolean
          github_url: string | null
          id: string
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          architecture_image_url?: string | null
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          demo_url?: string | null
          excerpt?: string | null
          featured?: boolean
          github_url?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          architecture_image_url?: string | null
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          demo_url?: string | null
          excerpt?: string | null
          featured?: boolean
          github_url?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      technologies: {
        Row: {
          category: string | null
          created_at: string
          icon_url: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          icon_url?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          category?: string | null
          created_at?: string
          icon_url?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      published_blog_posts: {
        Row: {
          content: string | null
          cover_image_url: string | null
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          id: string | null
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      published_solutions: {
        Row: {
          architecture_image_url: string | null
          category: string | null
          cover_image_url: string | null
          created_at: string | null
          demo_url: string | null
          excerpt: string | null
          featured: boolean | null
          github_url: string | null
          id: string | null
          published_at: string | null
          slug: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          architecture_image_url?: string | null
          category?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          demo_url?: string | null
          excerpt?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string | null
          published_at?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          architecture_image_url?: string | null
          category?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          demo_url?: string | null
          excerpt?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string | null
          published_at?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      level: "beginner" | "intermediate" | "advanced"
      section_name:
        | "hero"
        | "skills"
        | "certifications"
        | "experience"
        | "projects"
        | "contact"
        | "solutions"
        | "blog"
      skills_type:
        | "cloud"
        | "containerization"
        | "iac"
        | "security"
        | "monitoring"
        | "version_control"
      social_label: "GitHub" | "LinkedIn" | "Email"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      level: ["beginner", "intermediate", "advanced"],
      section_name: [
        "hero",
        "skills",
        "certifications",
        "experience",
        "projects",
        "contact",
        "solutions",
        "blog",
      ],
      skills_type: [
        "cloud",
        "containerization",
        "iac",
        "security",
        "monitoring",
        "version_control",
      ],
      social_label: ["GitHub", "LinkedIn", "Email"],
    },
  },
} as const
