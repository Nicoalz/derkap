export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenge: {
        Row: {
          category: string | null
          date_used: string | null
          description: string | null
          emoji: string | null
          id: number
          is_active: boolean | null
          is_already_used: boolean | null
          title: string | null
        }
        Insert: {
          category?: string | null
          date_used?: string | null
          description?: string | null
          emoji?: string | null
          id?: number
          is_active?: boolean | null
          is_already_used?: boolean | null
          title?: string | null
        }
        Update: {
          category?: string | null
          date_used?: string | null
          description?: string | null
          emoji?: string | null
          id?: number
          is_active?: boolean | null
          is_already_used?: boolean | null
          title?: string | null
        }
        Relationships: []
      }
      friendship: {
        Row: {
          accept_user: string | null
          created_at: string
          id: number
          request_user: string | null
          status: Database["public"]["Enums"]["status"] | null
        }
        Insert: {
          accept_user?: string | null
          created_at?: string
          id?: number
          request_user?: string | null
          status?: Database["public"]["Enums"]["status"] | null
        }
        Update: {
          accept_user?: string | null
          created_at?: string
          id?: number
          request_user?: string | null
          status?: Database["public"]["Enums"]["status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "friendship_accept_user_fkey"
            columns: ["accept_user"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendship_request_user_fkey"
            columns: ["request_user"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      NotificationSubscription: {
        Row: {
          created_at: string
          id: number
          subscription: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          subscription?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          subscription?: Json | null
        }
        Relationships: []
      }
      post: {
        Row: {
          created_at: string
          description: string | null
          feed: string
          file_name: string
          file_url: string | null
          id: number
          is_photo: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          feed?: string
          file_name: string
          file_url?: string | null
          id?: number
          is_photo?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          feed?: string
          file_name?: string
          file_url?: string | null
          id?: number
          is_photo?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          name: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          name?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cron_schedule: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      status: "waiting" | "accepted" | "declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
