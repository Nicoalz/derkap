import { Database } from './supabase';

export interface TUser {
  name: string,
  username: string,
  img: string,
}

export type TUserDb = Database['public']['Tables']['profile']['Row'];
export type DBStatusType = Database["public"]["Enums"]["status_friendship"] | null

export type TUserDBWithFriendship = TUserDb & {
  request_user: Pick<Database['public']['Tables']['friendship']['Row'], 'request_user' | 'status' >[],
  accept_user: Pick<Database['public']['Tables']['friendship']['Row'], 'accept_user' | 'status'>[],
}


export type TUserDBWithFriendshipAndFriendStatus = TUserDBWithFriendship & {
  friendStatus: DBStatusType
}


