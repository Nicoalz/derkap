"use client";
import KapsBox from '@/components/KapsBox';
import { useUser } from '@/contexts/user-context';
import { mockedKaps } from '@/libs/mockedKaps';
import { TKaps } from '@/types/Kaps';
import { SettingsIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import SettingsPopup from '../app/profile/SettingsPopup';
import Button from '../components/Button';
import CategoriesFilter from '../components/CategoriesFilter';
import { signoutSupabase } from '../functions/supabase/signout-supabase';
import { mockedCategories } from '../libs/mockedCategories';
import { TUserFriend } from '../types/User';

const ProfileScreen = ({ friends, friendsCount }: { friends: TUserFriend[] | null, friendsCount: number }) => {
  const { userData } = useUser();
  const { username, name } = userData
  const [abonnes, setAbonnes] = useState(123)
  const [abonnements, setAbonnements] = useState(102)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [kaps, setKaps] = useState<TKaps[]>(mockedKaps.slice(0, 2))

  const handleSignOut = async () => {
    await signoutSupabase()

  }

  return (
    <div className="w-full flex flex-col items-center mb-32 px-2">
      <div className='flex w-full justify-end'>
        {/* Icône pour ouvrir la popup des paramètres */}
        <button onClick={() => setIsSettingsOpen(true)}>
          <SettingsIcon size={24} className='text-custom-black font-bold' />
        </button>
      </div>

      {/* Popup pour les paramètres du son */}
      <SettingsPopup isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <div className='flex flex-col items-center'>
        <Image src={userData.avatar_url ?? ""} alt={name ?? ""} width={70} height={70}
          className='rounded-full my-2 w-24 h-24 object-cover border-2 border-custom-primary bg-custom-white'
        />
        <h2 className='font-champ text-custom-black text-[16px]' > {name || username || ""}</h2>
        <p className='text-[10px] text-slate-400'>@{username}</p>
        <button className=' flex flex-col items-center gap-x-12 my-4'>
          {/* MES AMIS */}
          <p>
            Amis
          </p>
          <h2 className='font-champ text-custom-black text-[16px]'>{friendsCount}</h2>
        </button>

      </div >

      <div className='w-full flex flex-col my-4'>
        <h2 className='font-champ text-custom-black text-[22px]'>Kaps</h2>
        <CategoriesFilter categories={mockedCategories} withAdmin={true} />
        <div className='gap-y-2'>
          {kaps.map((kap, i) => (
            <KapsBox kaps={kap} key={i} className='my-4' />
          ))}
        </div>
      </div>
      <Button className='w-fit' text="Se déconnecter" onClick={handleSignOut} />

    </div >
  );
};

export default ProfileScreen;
