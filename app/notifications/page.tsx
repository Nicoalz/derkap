"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ChallengerBox from '../../components/ChallengeBox';
import FriendDemandBox from '../../components/FriendDemandBox';
import Switch from '../../components/Switch';
import Title from '../../components/Title';
import { useChallengeStore } from '../../lib/store/useChallengeStore';
import { mockedChallenges as challenges } from '../../libs/mockedChallenges';
import { TChallenge, TUserDb } from '../../types';
export default function Notifications() {
  const [isFirstSwitchActive, setIsFirstSwitchActive] = useState(true)
  const { setChallenge } = useChallengeStore();
  const router = useRouter();
  const demands: TUserDb[] = [
    {
      id: "1",
      username: 'pelix_panot87',
      avatar_url: '/pelix.jpeg',
      created_at: '2021-09-01',
      name: 'Pelix Panot'
    }
  ]

  const redirectToChallenge = ({ challenge }: { challenge: TChallenge }) => {
    if (!challenge) return
    if (!challenge.id) return
    console.log({ challenge })
    setChallenge(challenge)
    router.push(`/capture?challengeId=${challenge.id}`)
  }

  return (
    <div className='px-2'>
      <Title text="Notifications" />
      <Switch switch1Text="Derkap" switch2Text="Demandes" isFirstSwitchActive={isFirstSwitchActive} setIsFirstSwitchActive={setIsFirstSwitchActive} className='mt-2' />
      {isFirstSwitchActive ? challenges.map(challenge => (
        <ChallengerBox key={challenge.id} challenge={challenge} className='mt-4' onClick={() => redirectToChallenge({ challenge: challenge })} />
      )) :
        demands.map(demand => (
          <FriendDemandBox key={demand.id} demand={demand} className='mt-4' />
        ))
      }
    </div>
  )
}
