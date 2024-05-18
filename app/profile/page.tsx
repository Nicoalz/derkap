import type { NextPage } from "next";

import Head from "next/head";

import ProfileScreen from "@/screens/ProfileScreen";

const Profile: NextPage = () => (
  <>
    <Head>
      <title>Profile</title>
      <meta name="description" content="Profile" />
    </Head>
    <ProfileScreen />
  </>
);

export default Profile;
