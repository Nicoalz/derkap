'use client';

import Image from 'next/image';

import ProfileHeader from '@/components/ProfileHeader';
import { useUser } from '@/contexts/user-context';
import { Separator } from '@/components/ui/separator';

const ProfileScreen = () => {
  const { userData } = useUser();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <ProfileHeader
        userData={userData}
      />
      <div className="w-full flex flex-col items-center">
        <Image
          src={userData.avatar_url ?? ''}
          alt={userData.username ?? ''}
          width={70}
          height={70}
          className="rounded-full my-2 w-24 h-24 object-cover border-2 border-custom-primary bg-custom-white"
        />
        <div className='w-full flex justify-center items-center gap-12'>
          <div className='flex flex-col items-center justify-center gap-1'>
            <p className='text-md font-bold'>14</p>
            <p className='text-sm'>Amis</p>
          </div>
          <div className='flex flex-col items-center justify-center gap-1'>
            <p className='text-md font-bold'>5</p>
            <p className='text-sm'>Groupes</p>
          </div>
        </div>
      </div>

      <Separator className='w-[80%] bg-gray-400 my-5'/>

      <div>
        <p>Mes Groupes</p>
      </div>
    
    </div>
  );
};

export default ProfileScreen;
