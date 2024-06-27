"use server";

import { createSupabaseAppServerClient } from '../../../libs/supabase/server';
import { TPostDb } from '../../../types';

export const pushPostToDb = async ({ post }: {post: TPostDb}) => {
  const supabase = createSupabaseAppServerClient();
  const user = supabase.auth.getUser();
  const user_id = (await user).data.user?.id;

  if (!user || !user_id) {
    throw new Error('Not authorized');
  }


  const { description, feed, is_photo, file_url} = post
  if (!file_url) return {
    error: 'No file url'
  }
  const date = new Date().toISOString();
  const blob = await fetch(file_url).then((r) => r.blob())

const { error:errorImg } = await supabase.storage
    .from("posts")
    .upload(`${user_id}/${date}`, blob, {
      upsert: true,
    })

    if (errorImg) {
      return {
        error: errorImg.message,
        data: null
      }
    }

const { data: imgData } =  supabase.storage.from("posts").getPublicUrl(`${user_id}/${date}`)
const publicUrl = imgData?.publicUrl

if (!publicUrl) {
  return {
    error : 'No public url',
    data: null
  }
}


  const { data, error:errorPost } = await supabase.from('post').insert(
    {description: description,
     feed: feed,
     is_photo: is_photo,
     file_url: publicUrl,
    }
  ).select('created_at, description, feed, file_url, id, is_photo, user:profile(*)').single()

  if (errorPost) {
    return {
      error: errorPost.message
    }
  }

  if (!data) {
    return {
      error: 'No data'
    }
  }

  console.log(data);



  const dataFormatted: TPostDb = {
    id: data.id,
    created_at: data.created_at,
    description: data.description,
    feed: data.feed,
    file_url: data.file_url,
    is_photo: data.is_photo,
    user: data.user as any

  }


  return {
    error: null,
    data: dataFormatted
  }

}

