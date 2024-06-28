"use server";

import { createSupabaseAppServerClient } from '../../../libs/supabase/server';
import { TPostDb } from '../../../types';


export const deletePost = async ({ post }: { post: TPostDb }) => {

  const {id: post_id, created_at} = post
  const {id: user_id} = post.user
  const supabase = createSupabaseAppServerClient();
  const {user} = (await supabase.auth.getUser()).data;

  if (!user) {
    return {
      error:'Not authorized'};
  }
const file_name = `${user_id}/${created_at}`
const { error:storageError } = await supabase
  .storage
  .from('posts')
  .remove([file_name])

  if (storageError) {
    return {error: storageError.message};
  }

  const { error } = await supabase.from('post').delete().eq('id', post_id);

  if (error) {
    return {error: error.message};
  }
}
