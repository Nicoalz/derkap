'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Lightbulb } from 'lucide-react';
import Button from '@/components/Button';
import { TProfileDB } from '@/types/types';
import { useUser } from '@/contexts/user-context';
import { getMyProfilName, getProfileName } from '@/functions/profile-actions';

import ProfileHeader from '@/components/ProfileHeader';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileScreen = ({
  userId,
  username,
}: {
  userId?: string;
  username?: string;
}) => {
  const { userData: currentUserData } = useUser();
  const [userData, setUserData] = useState<TProfileDB | null>(null);
  const [isUserProfil, setIsUserProfile] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (username || userId !== currentUserData.id) {
        const { data } = username
          ? await getProfileName({ user_name: username })
          : await getMyProfilName();
        if (data) {
          setUserData(data);
          if (data.username === currentUserData.username) {
            setIsUserProfile(true);
            setUserData(currentUserData);
          } else {
            setUserData(data);
          }
        }
      } else {
        setUserData(currentUserData);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [username, currentUserData]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-start">
        <header className="w-full flex justify-between items-center p-4 md:px-12 h-fit relative">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft size={24} />
          </Link>
        </header>
        <div className="w-full flex flex-col items-center gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <Skeleton className="rounded-full border border-custom-black w-24 h-24" />
            <Skeleton className="w-24 h-[28px]" />
          </div>
        </div>
        <Link
          href="mailto:derkap.dev@gmail.com"
          className="absolute bottom-5 right-5 flex flex-col gap-1 items-end"
        >
          <div className="bg-white py-1 px-2 rounded-xl animate-in">
            <p>Donnez nous votre feedback !</p>
          </div>
          <div className="w-fit border-2 border-custom-black p-2 rounded-full text-custom-black">
            <Lightbulb size={24} />
          </div>
        </Link>
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
    <div className="w-full h-screen flex flex-col items-center justify-start relative">
      <ProfileHeader
        isUserProfil={isUserProfil}
        isMyProfile={username ? false : true}
      />
      <div className="w-full flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          {userData.avatar_url ? (
            <Image
              src={`${userData.avatar_url}?t=${currentUserData.avatarTimestamp}`}
              alt={userData.username ?? ''}
              width={70}
              height={70}
              className="rounded-full w-24 h-24 object-cover border-2 border-custom-primary bg-custom-white"
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
          <h1 className="font-champ text-xl tracking-wider capitalize max-w-52 text-wrap overflow-hidden text-ellipsis text-center">
            {userData.username}
          </h1>
        </div>
      </div>

      <Link
        href="mailto:derkap.dev@gmail.com"
        className="absolute bottom-5 right-5 flex flex-col gap-1 items-end"
      >
        <div className="bg-white py-1 px-2 rounded-xl animate-in">
          <p>Donnez nous votre feedback !</p>
        </div>
        <div className="w-fit border-2 border-custom-black p-2 rounded-full text-custom-black">
          <Lightbulb size={24} />
        </div>
      </Link>
    </div>
  );
};

export default ProfileScreen;
