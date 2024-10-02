'use server';
import { createSupabaseAppServerClient } from '@/libs/supabase/server';

export const getVotes = async ({ challenge_id }: { challenge_id: number }) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }

  const { data, error } = await supabase
    .from('vote')
    .select('*')
    .eq('challenge_id', challenge_id);

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data: data,
    error: null,
  };
};

export const addVote = async ({
  post_id,
  challenge_id,
}: {
  post_id: number;
  challenge_id: number;
}) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }

  const { data, error } = await supabase
    .from('vote')
    .upsert(
      {
        post_id,
        challenge_id,
      },
      {
        onConflict: 'challenge_id, user_id',
      },
    )
    .select('*');

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
