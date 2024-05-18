import type { NextPage } from "next";

import Head from "next/head";

import HomeScreen from "@/screens/HomeScreen";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Accueil</title>
      <meta name="description" content="Accueil" />
    </Head>
    <HomeScreen />
  </>
);

export default Home;
