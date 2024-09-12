"use client";
import useRerender from '@/libs/store/useRerender';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChallengerBox from '../../components/ChallengeBox';
import FriendDemandBox from '../../components/FriendDemandBox';
import Switch from '../../components/Switch';
import Title from '../../components/Title';
import { getFriendRequests } from '../../functions/supabase/post/user/friend-request';
import { mockedChallenges as challenges } from '../../libs/mockedChallenges';
import { useChallengeStore } from '../../libs/store/useChallengeStore';
import { TChallenge, TFriendshipDB } from '../../types';

export default function Notifications() {
  const [isFirstSwitchActive, setIsFirstSwitchActive] = useState(true)
  const { setChallenge } = useChallengeStore();
  const [friendsRequets, setFriendsRequest] = useState<TFriendshipDB[]>([])
  const router = useRouter();
  const { render } = useRerender()


  const handleGetFriendsRequests = async () => {
    const { data, error } = await getFriendRequests()
    if (error) {
      console.error(error)
      return
    }
    data && setFriendsRequest(data)
  }

  useEffect(() => {
    handleGetFriendsRequests()
  }, [render])

  const redirectToChallenge = ({ challenge }: { challenge: TChallenge }) => {
    if (!challenge) return
    if (!challenge.id) return
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
        friendsRequets.length === 0 ? <p className='text-center mt-4'>Aucune demande d'amis</p> :
          friendsRequets.map(request => (

            <FriendDemandBox key={request.id} request={request} className='mt-4' />
          ))
      }
    </div>
  )
}
