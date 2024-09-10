'use server';

import { createSupabaseAppServerClient } from '@/libs/supabase/server';

export const getUserByUsername = async (username: string) => {
  const supabase = createSupabaseAppServerClient();

  const {user} = (await supabase.auth.getUser()).data

  if (!user) {
    console.error('No user')
  }

  try {
    console.log('username', username)
  const { data, error } = await supabase.from('profile').select('*').ilike('username', `%${username}%`)

    console.log('data', data)
    console.log('error', error)
  if (error) {
    return {
      data: null,
      error: error.message
    }
  }


  if (!data) {
    return {
      data: null,
      error: 'No data'
    }
  }

  return {
    data: data,
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
