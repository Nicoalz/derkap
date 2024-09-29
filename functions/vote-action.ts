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
    .select('*, challenge!inner(*)')
    .eq('challenge_id', challenge_id)
    .limit(1, { foreignTable: 'challenge' });

  console.log(error);
  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  const voteFormatted = data.map(vote => {
    return {
      ...vote,
      challenge: vote.challenge[0],
    };
  });

  return {
    data: voteFormatted,
    error: null,
  };
};

export const addVote = async ({ post_id }: { post_id: number }) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }

  const { data: post, error: errorChallenge } = await supabase
    .from('post')
    .select('*')
    .eq('id', post_id)
    .single();

  console.log(errorChallenge);

  if (errorChallenge) {
    return {
      data: null,
      error: errorChallenge.message,
    };
  }

  const { data, error } = await supabase
    .from('vote')
    .upsert(
      {
        post_id,
        challenge_id: post.challenge_id,
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
