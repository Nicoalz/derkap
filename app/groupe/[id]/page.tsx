'use client';

import React from 'react';
import Head from 'next/head';
import GroupeScreen from '../../../screens/GroupeScreen';

export default function Groupe({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <Head>
        <title>{id}</title>
        <meta name="description" content="Accueil" />
      </Head>
      <GroupeScreen id={id} />
    </>
  );
}
