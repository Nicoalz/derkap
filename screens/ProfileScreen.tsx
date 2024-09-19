'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

import { TProfileDB } from '@/types/types';
import { useUser } from '@/contexts/user-context';
import { getProfileName } from '@/functions/profile-actions';

import ProfileHeader from '@/components/ProfileHeader';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileScreen = ({ id }: { id?: string }) => {
  const { userData: currentUserData } = useUser();
  const [userData, setUserData] = useState<TProfileDB | null>(null);
  const [isUserProfil, setIsUserProfile] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (id) {
        setIsUserProfile(false);
        const { data } = await getProfileName({ user_name: id });
        if (data) {
          setUserData(data);
        }
      } else {
        setUserData(currentUserData);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id, currentUserData]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-start">
        <header className="w-full flex justify-between items-center p-6 md:px-12 h-fit relative">
          <Link href="/" className="flex items-center gap-x-2">
            <ChevronLeft size={24} />
          </Link>

          <Skeleton className="abs-center w-52 h-8" />
        </header>
        <div className="w-full flex flex-col items-center gap-2">
          <Skeleton className="rounded-full border border-custom-black w-24 h-24" />
          <div className="w-full flex justify-center items-center gap-12">
            <div className="flex flex-col items-center justify-center gap-1">
              <Skeleton className="w-6 h-6" />
              <p className="text-sm">Amis</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <Skeleton className="w-6 h-6" />
              <p className="text-sm">Groupes</p>
            </div>
          </div>
        </div>
        <Separator className="w-[80%] bg-gray-400 my-5" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-start">
        <header className="w-full flex justify-between items-center p-6 md:px-12 h-fit relative">
          <Link href="/" className="flex items-center gap-x-2">
            <ChevronLeft size={24} />
          </Link>
        </header>
        <p className="p-5 text-center">
          Aucun utilisateur ne correpsond à votre recherche...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <ProfileHeader isUserProfil={isUserProfil} userData={userData} />
      <div className="w-full flex flex-col items-center gap-2">
        {userData.avatar_url ? (
          <Image
            src={userData.avatar_url ?? ''}
            alt={userData.username ?? ''}
            width={70}
            height={70}
            className="rounded-full my-2 w-24 h-24 object-cover border-2 border-custom-primary bg-custom-white"
          />
        ) : (
          <div className="flex items-center justify-center bg-custom-white rounded-full border border-custom-black w-24 h-24">
            <p className="uppercase">
              {userData.username
                .split(' ')
                .map(word => word.charAt(0))
                .join('')}
            </p>
          </div>
        )}
        <div className="w-full flex justify-center items-center gap-12">
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-md font-bold">14</p>
            <p className="text-sm">Amis</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-md font-bold">5</p>
            <p className="text-sm">Groupes</p>
          </div>
        </div>
      </div>

      <Separator className="w-[80%] bg-gray-400 my-5" />
    </div>
  );
};

export default ProfileScreen;
