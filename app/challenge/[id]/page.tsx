'use client';

import { useEffect } from 'react';
import { useChallengeStore } from '../../../libs/store/useChallengeStore';


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


  return (
    <div>
      <p>{challenge?.title}</p>
      <p>{challenge?.subtitle}</p>
      <p>{challenge?.description}</p>
    </div>
  )
}
