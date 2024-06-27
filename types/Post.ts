import { Database } from './supabase';
import { TUser, TUserDb } from './User';

export interface TPost {
  isPhoto: boolean, // if false, it's a video
  url: string,
  description: string,
  user: TUser,
  date: string,
  feed: string,
}

// get without userID

type TPostPick = Pick<
  Database["public"]["Tables"]["post"]["Row"],
  "description" | "feed" | "file_url" | "id" | "is_photo" | "created_at"
>;

export type TPostDb = TPostPick & {
  user: TUserDb;
};




export const postWitdh = 1080/2;
export const postHeight = 1350/2;
