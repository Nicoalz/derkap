'use server';

import { createSupabaseAppServerClient } from '@/libs/supabase/server';
import { DBStatusType, TUserDBWithFriendship } from '../../../../types';

export const getUserByUsername = async (username: string) => {
  const supabase = createSupabaseAppServerClient();

  const {user} = (await supabase.auth.getUser()).data

  if (!user) {
    console.error('No user')
    return {
      data: null,
      error: 'No user'
    }
  }

  try {
  const { data, error } = await supabase.from('profile').select('*, accept_user:friendship!friendship_accept_user_fkey(accept_user, status), request_user:friendship!friendship_request_user_fkey(request_user, status)').ilike('username', `%${username}%`)

    const userFriend = data?.map((user: TUserDBWithFriendship) => {
      const userAlreadyFriendWith = user.request_user.find((requestUser) => requestUser.request_user === user.id && requestUser.status == "accepted") || user.accept_user.find((acceptUser) => acceptUser.accept_user === user.id && acceptUser.status == "accepted")
      const userAlreadyRequested = user.request_user.find((requestUser) => requestUser.request_user === user.id && requestUser.status == "pending" ) || user.accept_user.find((acceptUser) => acceptUser.accept_user === user.id && acceptUser.status == "pending")

      const friendStatus: DBStatusType = userAlreadyFriendWith ? 'accepted' : userAlreadyRequested ? 'pending' : null
      return {
        ...user,
        friendStatus: friendStatus
      }
    })


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
    data: userFriend,
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
