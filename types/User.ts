import { Database } from './supabase';

export interface TUser {
  name: string,
  username: string,
  img: string,
}

export type TUserDb = Database['public']['Tables']['profile']['Row'];
