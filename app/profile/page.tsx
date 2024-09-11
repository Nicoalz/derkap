
import Head from "next/head";

import ProfileScreen from "@/screens/ProfileScreen";
import { redirect } from 'next/navigation';
import { createSupabaseAppServerClient } from '../../libs/supabase/server';
import { TUserFriend } from '../../types';

export default async function Profile() {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data

  if (!user) {
    redirect('/login')
  }
  const { data: friends, count } = await supabase
    .from('friendship')
    .select('*, user_a:accept_user(*), user_r:request_user(*)', { count: 'exact' })
    .or(`accept_user.eq.${user.id}, request_user.eq.${user.id}`)
    .eq('status', 'accepted')
    .order('created_at', { ascending: false })
    .returns<TUserFriend[]>()

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
      </Head>
      <ProfileScreen friends={friends} friendsCount={count ?? 0} />
    </>
  );

}
