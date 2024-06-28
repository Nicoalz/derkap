"use client";
import Image from 'next/image';

import { useUser } from '../contexts/user-context';
import { Settings } from '../components/Icon';
import FiltreBouton from '../components/FiltreBouton';
import { Filter } from 'lucide-react';

const ProfileScreen: React.FC = () => {
  const { userData } = useUser();
  const communities = ['IIMPACT', 'Paris 15']
  const postsAmount = 10

  return (
    <div className="w-full flex flex-col items-center mb-16 p-4">
      <div className='flex items-center justify-end w-full'>
        <Settings />
      </div>
      <div className='flex flex-col items-center w-full'>
        <Image src={userData.avatar_url ?? ""} alt={userData.name ?? ""} width={70} height={70}
          className='rounded-full my-2 w-20 h-20 object-cover border-2 border-custom-primary'
        />
        <p className='text-champ tracking-widest'>{userData.username}</p>
        <p className='text-[10px] text-slate-400'>@{userData.username}</p>
        <div className='flex justify-between items-center gap-x-8 my-4'>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-semibold text-dmsans'>123</p>
            <p>Followers</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-semibold text-dmsans'>102</p>
            <p>Suivi(e)s</p>
          </div>
        </div>
      </div>


      <div className='w-full flex flex-col gap-4'>
        <p className='text-xl text-champ'>
          Kaps
        </p>
        <div className=' relative w-full before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px]  before:bg-[linear-gradient(to_right,#F6D5F7_0%,rgba(255,255,255,0)_100%)] before:content-[""] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-linear-gradient(to_right,#FBE9D7_0%,rgba(255,255,255,0)_100%) after:content-[""]'>
          <div className='flex items-center justify-start gap-2 overflow-scroll noscrollbar'>
            <FiltreBouton label='Admin' emoji='👮‍♂️' />
            <div className='w-px shrink-0 h-5 rounded-full bg-custom-black'></div>
            <FiltreBouton label='Voyage' emoji='✈️' />
            <FiltreBouton label='Sport' emoji='🏋️‍♂️' />
            <FiltreBouton label='Cuisine' emoji='🍳' />
            <FiltreBouton label='Cuisine' emoji='🍳' />
            <FiltreBouton label='Cuisine' emoji='🍳' />
            <FiltreBouton label='Cuisine' emoji='🍳' />
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProfileScreen;
