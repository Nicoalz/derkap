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
          created_at: string
          creator_id: string | null
          description: string
          group_id: number
          id: number
          status: Database["public"]["Enums"]["challenge_status"]
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          description: string
          group_id: number
          id?: number
          status: Database["public"]["Enums"]["challenge_status"]
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          description?: string
          group_id?: number
          id?: number
          status?: Database["public"]["Enums"]["challenge_status"]
        }
        Relationships: [
          {
            foreignKeyName: "challenge_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
        ]
      }
      group: {
        Row: {
          created_at: string
          id: number
          img_url: string | null
          invite_code: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          img_url?: string | null
          invite_code?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          img_url?: string | null
          invite_code?: string | null
          name?: string
        }
        Relationships: []
      }
      group_profile: {
        Row: {
          created_at: string
          group_id: number
          id: number
          profile_id: string | null
        }
        Insert: {
          created_at?: string
          group_id: number
          id?: number
          profile_id?: string | null
        }
        Update: {
          created_at?: string
          group_id?: number
          id?: number
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_profile_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_profile_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_subscription: {
        Row: {
          created_at: string
          id: number
          subscription: Json | null
          url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          subscription?: Json | null
          url?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          subscription?: Json | null
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_subscription_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
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
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          subscription?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          subscription?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "NotificationSubscription_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      post: {
        Row: {
          challenge_id: number
          created_at: string
          file_name: string | null
          id: number
          img_url: string
          profile_id: string | null
        }
        Insert: {
          challenge_id: number
          created_at?: string
          file_name?: string | null
          id?: number
          img_url: string
          profile_id?: string | null
        }
        Update: {
          challenge_id?: number
          created_at?: string
          file_name?: string | null
          id?: number
          img_url?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_profile_id_fkey"
            columns: ["profile_id"]
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
          email: string
          id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          username?: string
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
      vote: {
        Row: {
          challenge_id: number
          created_at: string
          id: number
          post_id: number
          user_id: string
        }
        Insert: {
          challenge_id: number
          created_at?: string
          id?: number
          post_id: number
          user_id?: string
        }
        Update: {
          challenge_id?: number
          created_at?: string
          id?: number
          post_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vote_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vote_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vote_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
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
      generate_unique_invite_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_group_user_count: {
        Args: {
          group_id_param: number
        }
        Returns: number
      }
      get_latest_challenge_status: {
        Args: {
          group_ids: number[]
        }
        Returns: {
          group_id: number
          status: Database["public"]["Enums"]["challenge_status"]
        }[]
      }
    }
    Enums: {
      challenge_status: "posting" | "voting" | "ended"
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
