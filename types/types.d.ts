import { Database } from "@/types/supabase";

// USERS
export type TProfileDB = Database['public']['Tables']['profile']['Row'];

// NOTIFICATIONS
export interface TVapidDetails {
  subject: string;
  publicKey: string;
  privateKey: string;
}

// CHALLENGES
export type TChallengeDB = Database["public"]["Tables"]["challenge"]["Row"];

// GROUPS
export type TGroupDB = Database["public"]["Tables"]["group"]["Row"] & {
   members: {
    profile: TProfileDB | null;
  }[]
}

// POSTS
export type TPostDB = Database["public"]["Tables"]["post"]["Row"];




