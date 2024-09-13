import type { NextPage } from 'next';

import Head from 'next/head';

import HomeScreen from '@/screens/HomeScreen';
import { createSupabaseAppServerClient } from '../libs/supabase/server';

const Home: NextPage = async () => {
  const supabase = createSupabaseAppServerClient();

  const { user } = (await supabase.auth.getUser()).data;

  return (
    <>
      <Head>
        <title>Accueil</title>
        <meta name="description" content="Accueil" />
      </Head>
      <HomeScreen />
    </>
  );
};

export default Home;
