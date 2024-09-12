"use server";
import { createSupabaseAppServerClient } from '../../../libs/supabase/server';

export const insertReactionToPost = async ({post_id, emoji}: {post_id: number, emoji: string}) => {

    const supabase = createSupabaseAppServerClient();
  const {user} = (await supabase.auth.getUser()).data;

  if  (!user) {
    return {
      error: 'User not found'
    }
  }

  const {data: post, error} = await supabase.from('post').select('reactions').eq('id', post_id).single();
  if (error) {
    return {
      error: error.message
    }
  }

  // CHECK IF USER ALREADY REACTED

  let newEmoji: any[] = [];

  newEmoji = post.reactions?.filter((reaction) => reaction.user_id !== user.id) ?? [];

  newEmoji = post.reactions ? [...newEmoji, {emoji, user_id: user.id}] : [{emoji, user_id: user.id}];



  console.log(newEmoji);
  const {error: errorUpdate} = await supabase.from('post').update({reactions: newEmoji}).eq('id', post_id);
  if (errorUpdate) {
    return {
      error: errorUpdate.message
    }
  }
  return {
    error: null
  }


}
