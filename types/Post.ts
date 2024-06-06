import { TUser } from './User';

export interface TPost {
  isPhoto: boolean, // if false, it's a video
  url: string,
  description: string,
  user: TUser,
  date: string,
  feed: string,
}

export const postWitdh = 1080/2;
export const postHeight = 1350/2;
