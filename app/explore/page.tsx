import type { NextPage } from "next";

import Head from "next/head";

import ExploreScreen from "@/screens/ExploreScreen";

const Explore: NextPage = () => (
  <>
    <Head>
      <title>Explorer</title>
      <meta name="description" content="Explorer" />
    </Head>
    <ExploreScreen />
  </>
);

export default Explore;
