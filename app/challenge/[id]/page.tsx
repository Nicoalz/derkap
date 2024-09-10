'use client';

import { useEffect } from 'react';
import { useChallengeStore } from '../../../lib/store/useChallengeStore';


export default function Challenge({ params }: { params: { id: number } }) {

  const { id } = params;

  const { challenge } = useChallengeStore();

  const fetchChallenge = async () => {
  }

  useEffect(() => {
    if (!challenge) {
      fetchChallenge();
    }
  }, [])

  console.log({ challenge });

  return (
    <div>
      <p>{challenge?.title}</p>
      <p>{challenge?.subtitle}</p>
      <p>{challenge?.description}</p>
    </div>
  )
}
