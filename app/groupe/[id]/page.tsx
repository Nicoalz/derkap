'use client';

import React from "react";
import Head from "next/head";
import GroupScreen from "../../../screens/GroupScreen";

export default function Groupe({ params }: { params: { id: string } }) {

  const { id } = params;

  return (
    <>
      <Head>
        <title>{id}</title>
        <meta name="description" content="Accueil" />
      </Head>
      <GroupScreen id={id} />
    </>
  )
}