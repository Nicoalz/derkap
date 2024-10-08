import { Database } from '@/types/supabase';

// USERS
export type TProfileDB = Database['public']['Tables']['profile']['Row'];

// NOTIFICATIONS
export interface TVapidDetails {
  subject: string;
  publicKey: string;
  privateKey: string;
}

// CHALLENGES
export type TChallengeDB =
  | (Database['public']['Tables']['challenge']['Row'] & {
      creator: TProfileDB | null;
    })
  | null;

// GROUPS
export type TGroupDB = Database['public']['Tables']['group']['Row'] & {
  members: {
    profile: TProfileDB | null;
  }[];
  challengeStatus?: 'posting' | 'voting' | 'ended';
};

export type TGroupsStatus = {
  group_id: number;
  status: 'posting' | 'voting' | 'ended';
};

// POSTS
export type TPostDB = Database['public']['Tables']['post']['Row'] & {
  creator: TProfileDB | null;
};

// VOTES
export type TVoteDB = Database['public']['Tables']['vote']['Row'];
