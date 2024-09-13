'use server';

import { createSupabaseAppServerClient } from '@/libs/supabase/server';

export const getProfile = async ({ user_id }: { user_id?: string }) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', user_id ?? user.id)
    .single();
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
