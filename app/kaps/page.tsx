import type { NextPage } from "next";

import Head from "next/head";

import KapsScreen from "@/screens/KapsScreen";

const Profile: NextPage = () => (
  <>
    <Head>
      <title>Profile</title>
      <meta name="description" content="Profile" />
    </Head>
    <KapsScreen />
  </>
);

export default Profile;
