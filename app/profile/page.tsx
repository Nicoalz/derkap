import Head from 'next/head';
import ProfileScreen from '@/screens/ProfileScreen';
import { redirect } from 'next/navigation';
import { createSupabaseAppServerClient } from '../../libs/supabase/server';
import PageTransition from '../PageTransition';

export default async function Profile() {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;

  if (!user) {
    redirect('/login');
  }

  return (
    <PageTransition title="Profile">
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
      </Head>
      <ProfileScreen />
    </PageTransition>
  );
}
