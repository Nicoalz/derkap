
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

  // GET ONLY COUNT IN SERVER TO DONT HAVE BROWSER LOAD
  const { count } = await supabase
    .from('friendship')
    .select('id', { count: 'exact' })
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
      <ProfileScreen friendsCount={count ?? 0} />
    </>
  );

}
