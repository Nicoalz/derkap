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
    accept_user: demand_user_id,
    status: 'pending'
  })


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

export const cancelFriendRequest = async (demand_user_id: string) => {
  const supabase = createSupabaseAppServerClient();

  const {user} = (await supabase.auth.getUser()).data

  if (!user) {
    return {
      data: null,
      error: 'No user'
    }
  }

  try {
  const { data, error } = await supabase.from('friendship').update({
    status: 'canceled'
  }).eq('request_user', user.id).eq('accept_user', demand_user_id).eq('status', 'pending')


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

export const deleteFriendDB = async (demand_user_id: string) => {
  const supabase = createSupabaseAppServerClient();

  const {user} = (await supabase.auth.getUser()).data

  if (!user) {
    return {
      data: null,
      error: 'No user'
    }
  }

  try {
  const { data, error } = await supabase.from('friendship')
  .delete()
  .or(`and(request_user.eq.${user.id},accept_user.eq.${demand_user_id}),and(request_user.eq.${demand_user_id},accept_user.eq.${user.id})`)
  .eq('status', 'accepted')

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
