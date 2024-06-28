"use client";
import { useState } from 'react';
import ChallengerBox from '../../components/ChallengeBox';
import FriendDemandBox from '../../components/FriendDemandBox';
import Switch from '../../components/Switch';
import Title from '../../components/Title';
import { TUserDb } from '../../types';
import { mockedChallenges as challenges } from '../../libs/mockedChallenges';
export default function Notifications() {
  const [isFirstSwitchActive, setIsFirstSwitchActive] = useState(true)

  const demands: TUserDb[] = [
    {
      id: "1",
      username: 'pelix_panot87',
      avatar_url: '/pelix.jpeg',
      created_at: '2021-09-01',
      name: 'Pelix Panot'
    }
  ]

  return (
    <div>
      <Title text="Notifications" />
      <Switch switch1Text="Derkap" switch2Text="Demandes" isFirstSwitchActive={isFirstSwitchActive} setIsFirstSwitchActive={setIsFirstSwitchActive} className='mt-2' />
      {isFirstSwitchActive ? challenges.map(challenge => (
        <ChallengerBox key={challenge.id} challenge={challenge} className='mt-4' />
      )

      )

        :
        demands.map(demand => (
          <FriendDemandBox key={demand.id} demand={demand} className='mt-4' />
        ))


      }


    </div>
  )
}
