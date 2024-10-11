'use client';

import React from 'react';
import Head from 'next/head';
import ProfileScreen from '@/screens/ProfileScreen';
import PageTransition from '@/app/PageTransition';

export default function ProfilUser({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  return (
    <PageTransition title="Accueil">
      <Head>
        <title>{username}</title>
        <meta name="description" content="Accueil" />
      </Head>
      <ProfileScreen username={username} />
    </PageTransition>
  );
}
