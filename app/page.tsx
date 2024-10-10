import type { NextPage } from 'next';
import Head from 'next/head';
import HomeScreen from '@/screens/HomeScreen';
import PageTransition from './PageTransition';

const Home: NextPage = async () => {
  return (
    <PageTransition title="Accueil">
      <Head>
        <title>Accueil</title>
        <meta name="description" content="Accueil" />
      </Head>

      <HomeScreen />
    </PageTransition>
  );
};

export default Home;
