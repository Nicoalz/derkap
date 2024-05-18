import type { NextPage } from "next";

import Head from "next/head";

import DiscoverScreen from "@/screens/DiscoverScreen";

const Discover: NextPage = () => (
  <>
    <Head>
      <title>Découvrir</title>
      <meta name="description" content="Découvrir" />
    </Head>
    <DiscoverScreen />
  </>
);

export default Discover;
