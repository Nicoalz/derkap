'use server';

import { createSupabaseAppServerClient } from '../../../libs/supabase/server';

export const getPosts = async () => {
  const supabase = createSupabaseAppServerClient();

  const user = (await supabase.auth.getUser()).data;

  if (!user) {
    console.error('No user');
  }

  console.log('user', user);

  try {
    const { data, error } = await supabase
      .from('post')
      .select(
        'created_at, reactions, description, feed, file_url, id, is_photo, user:profile(*)',
      )
      .order('created_at', { ascending: false });

    console.log('data', data);
    console.log('error', error);
    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }

    if (!data) {
      return {
        data: null,
        error: 'No data',
      };
    }

    return {
      data: data,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: error,
    };
  }
};
