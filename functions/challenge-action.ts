'use server';

import { createSupabaseAppServerClient } from '@/libs/supabase/server';

export const createChallenge = async ({
  challenge,
}: {
  challenge: {
    description: string;
    group_id: number;
  };
}) => {
  const supabase = createSupabaseAppServerClient();
  const user = supabase.auth.getUser();
  const user_id = (await user).data.user?.id;

  if (!user || !user_id) {
    throw new Error('Not authorized');
  }
  //todo: check if there is already a challenge for this group, if so, return an error
  const { error: errorCreate } = await supabase.from('challenge').insert({
    description: challenge.description,
    creator_id: user_id,
    group_id: challenge.group_id,
    status: 'posting',
  });

  if (errorCreate) {
    return {
      error: errorCreate.message,
    };
  }

  return {
    error: null,
    data: null,
  };
};

export const getCurrentChallenge = async ({
  group_id,
}: {
  group_id: string;
}) => {
  const supabase = createSupabaseAppServerClient();
  // get the latest created challenge, and the profile of the creator
  const { data, error } = await supabase
    .from('challenge')
    .select(`*, creator:profile(*)`)
    .eq('group_id', group_id)
    .order('created_at', { ascending: false })
    .limit(1);
  // .single(); // => if single set and no row is found, it will return an error, but no challenge can be possible so no error

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

export const setChallengeToVoting = async ({
  challenge_id,
}: {
  challenge_id: number;
}) => {
  const supabase = createSupabaseAppServerClient();
  const { error } = await supabase
    .from('challenge')
    .update({ status: 'voting' })
    .eq('id', challenge_id);

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    data: null,
    error: null,
  };
};

export const setChallengeToEnd = async ({
  challenge_id,
}: {
  challenge_id: number;
}) => {
  const supabase = createSupabaseAppServerClient();
  const { error } = await supabase
    .from('challenge')
    .update({ status: 'ended' })
    .eq('id', challenge_id);

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    data: null,
    error: null,
  };
};
