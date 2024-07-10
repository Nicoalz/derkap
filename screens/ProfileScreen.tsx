"use client";
import FollowBlock from '@/components/FollowBlock';
import KapsBox from '@/components/KapsBox';
import { useUser } from '@/contexts/user-context';
import { mockedKaps } from '@/libs/mockedKaps';
import { TKaps } from '@/types/Kaps';
import Image from 'next/image';
import { useState } from 'react';
import CategoriesFilter from '../components/CategoriesFilter';
import { mockedCategories } from '../libs/mockedCategories';
import { SettingsIcon } from 'lucide-react';

const ProfileScreen: React.FC = () => {
  const { userData } = useUser();
  const { username, name } = userData
  const [abonnes, setAbonnes] = useState(123)
  const [abonnements, setAbonnements] = useState(102)
  const [kaps, setKaps] = useState<TKaps[]>(mockedKaps)
  return (
    <div className="w-full flex flex-col items-center mb-32 px-2">
      <div className='flex w-full justify-end'>
        <SettingsIcon size={24} className='text-custom-black font-bold' />
      </div>
      <div className='flex flex-col items-center'>
        <Image src={userData.avatar_url ?? ""} alt={name ?? ""} width={70} height={70}
          className='rounded-full my-2 w-24 h-24 object-cover border-2 border-custom-primary'
        />
        <h2 className='font-champ text-custom-black text-[16px]' > {name || username || ""}</h2>
        <p className='text-[10px] text-slate-400'>@{username}</p>
        <div className='flex justify-between items-center gap-x-12   my-4'>
          <FollowBlock amount={abonnes} text='Abonnés' />
          <FollowBlock amount={abonnements} text='Abonnements' />
        </div>
      </div>
      <div className='w-full flex flex-col my-4'>
        <h2 className='font-champ text-custom-black text-[22px]'>Kaps</h2>
        <CategoriesFilter categories={mockedCategories} withAdmin={true} />
        <div className='gap-y-2'>
          {
            kaps.map((kap, i) => (
              <KapsBox kaps={kap} className='my-4' />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
