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

// export const getChallenge = async ({ challenge_id }: { challenge_id: string }) => {
//   const supabase = createSupabaseAppServerClient();
//   const { user } = (await supabase.auth.getUser()).data;
//   if (!user) {
//     return {
//       data: null,
//       error: 'User not found',
//     };
//   }
//   const { data, error } = await supabase
//     .from('post')
//     .select('*')
//     .eq('challenge_id', challenge_id);
//   if (error) {
//     return {
//       data: null,
//       error: error.message,
//     };
//   }

//   return {
//     data,
//     error: null,
//   };
// };
