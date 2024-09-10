import type { NextPage } from "next";

import Head from "next/head";

import CaptureScreen from "@/screens/CaptureScreen";

const Profile: NextPage = () => (
  <>
    <Head>
      <title>Derkap</title>
      <meta name="description" content="Capture" />
    </Head>
    <CaptureScreen />
  </>
);

export default Profile;
