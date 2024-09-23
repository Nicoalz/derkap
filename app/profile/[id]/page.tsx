'use client';

import React from 'react';
import Head from 'next/head';
import ProfileScreen from '@/screens/ProfileScreen';

export default function ProfilUser({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <Head>
        <title>{id}</title>
        <meta name="description" content="Accueil" />
      </Head>
      <ProfileScreen id={id} />
    </>
  );
}