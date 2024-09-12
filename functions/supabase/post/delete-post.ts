"use server";

import { revalidatePath } from 'next/cache';
import { createSupabaseAppServerClient } from '../../../libs/supabase/server';
import { TPostDb } from '../../../types';


export const deletePost = async ({ post }: { post: TPostDb }) => {

  try {
  const {id: post_id, created_at, file_name} = post
  const {id: user_id} = post.user
  const supabase = createSupabaseAppServerClient();
  const {user} = (await supabase.auth.getUser()).data;

  if (!user) {
    return {
      error:'Not authorized'};
  }
const _file_name = file_name ?? `${user_id}/${created_at}`


const { error:storageError } = await supabase
  .storage
  .from('posts')
  .remove([_file_name])
  .then((r) => r)


  if (storageError) {
    return {error: storageError.message};
  }

  const { error } = await supabase.from('post').delete().eq('id', post_id)

  if (error) {
    return {error: error.message};
  }

  return {error: null};

} catch (error) {
console.error(error);
  return {error: error};
}
finally {
  revalidatePath('/')
}
}
