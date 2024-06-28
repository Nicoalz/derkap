"use client";
import { useState } from 'react';
import ChallengerBox from '../../components/ChallengeBox';
import Switch from '../../components/Switch';
import Title from '../../components/Title';
import { TDerkap } from '../../types/Derkap';

export default function Notifications() {
  const [isFirstSwitchActive, setIsFirstSwitchActive] = useState(true)

  const derkaps: TDerkap[] = [
    {
      id: 1,
      title: 'DERKAP du jour',
      subtitle: 'Chauve qui peut !',
      description: 'Prends une photo de toi avec une personne chauve !',
      icone: '👨‍🦲'
    },
    {
      id: 2,
      title: 'Tema la Bête',
      subtitle: 'La folie des Road Trips',
      description: 'Filme un animal complètement débile rencontré sur la route !',
      icone: '😹'
    },

    {
      id: 3,
      title: "¡ Flag Fiesta ! ",
      subtitle: 'Les Français en Espagne',
      description: 'Prends une photo de toi avec un drapeau espagnol !',
      icone: '🇪🇸'

    }



  ]
  return (
    <div>
      <Title text="Notifications" />
      <Switch switch1Text="Notifications" switch2Text="Derkap" isFirstSwitchActive={isFirstSwitchActive} setIsFirstSwitchActive={setIsFirstSwitchActive} className='mt-2' />
      {derkaps.map(derkap => (
        <ChallengerBox key={derkap.id} derkap={derkap} className='mt-4' />
      ))}

    </div>
  )
}
