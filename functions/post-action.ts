'use server';

import { createSupabaseAppServerClient } from '@/libs/supabase/server';

export const pushPostToDb = async ({
  post,
}: {
  post: {
    file_url: string;
    challenge_id: number;
  };
}) => {
  const supabase = createSupabaseAppServerClient();
  const user = supabase.auth.getUser();
  const user_id = (await user).data.user?.id;

  if (!user || !user_id) {
    throw new Error('Not authorized');
  }

  const { file_url, challenge_id } = post;
  if (!file_url)
    return {
      error: 'No file url',
    };
  const date = new Date().toISOString();
  const blob = await fetch(file_url).then(r => r.blob());

  const _file_name = user_id + '/' + date + '.jpeg';

  const { data: img, error: errorImg } = await supabase.storage
    .from('posts')
    .upload(_file_name, blob, {
      upsert: true,
    });

  if (errorImg) {
    return {
      error: errorImg.message,
      data: null,
    };
  }

  const { data: imgData } = supabase.storage
    .from('posts')
    .getPublicUrl(_file_name);
  const publicUrl = imgData?.publicUrl;

  if (!publicUrl) {
    return {
      error: 'No public url',
      data: null,
    };
  }

  const { error: errorPost } = await supabase
    .from('post')
    .insert({
      img_url: publicUrl,
      profile_id: user_id,
      challenge_id: challenge_id,
      file_name: _file_name,
    })
    .single();

  if (errorPost) {
    return {
      error: errorPost.message,
    };
  }

  //await verifyChallengeCompletion({ challenge_id });

  return {
    error: null,
    data: null,
  };
};

// const verifyChallengeCompletion = async ({
//   challenge_id,
// }: {
//   challenge_id: number;
// }) => {
//   // get the number of posts for this challenge and the numbers of members in the group, if they are equal, then the challenge is completed
// }

export const getPosts = async ({ challenge_id }: { challenge_id: number }) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }
  const { data, error } = await supabase
    .from('post')
    .select('*')
    .eq('challenge_id', challenge_id);
  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data,
    error: null,
  };
};
