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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
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
          id: number
          location: string | null
          period: string | null
          technologies: Json | null
          title: string
          type: string | null
        }
        Insert: {
          achievements?: Json | null
          company: string
          id?: number
          location?: string | null
          period?: string | null
          technologies?: Json | null
          title: string
          type?: string | null
        }
        Update: {
          achievements?: Json | null
          company?: string
          id?: number
          location?: string | null
          period?: string | null
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
          href: string
          icon: string
          id: string
          label: Database["public"]["Enums"]["social_label"]
        }
        Insert: {
          href: string
          icon: string
          id?: string
          label: Database["public"]["Enums"]["social_label"]
        }
        Update: {
          href?: string
          icon?: string
          id?: string
          label?: Database["public"]["Enums"]["social_label"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
