'use server';

import { createSupabaseAppServerClient } from '@/libs/supabase/server';

export const sendFriendRequest = async (demand_user_id: string) => {
  const supabase = createSupabaseAppServerClient();

  const {user} = (await supabase.auth.getUser()).data

  if (!user) {
    return {
      data: null,
      error: 'No user'
    }
  }

  try {
  const { data, error } = await supabase.from('friendship').insert({
    request_user: user.id,
    accept_user: demand_user_id
  })

      console.log('data', data)
      console.log('error', error)
    if (error) {
      return {
        data: null,
        error: error.message
      }
    }
    return {
      error: null
    }
  } catch (error) {
    console.error(error)
    return {
      data: null,
      error: error
    }

  }
}
