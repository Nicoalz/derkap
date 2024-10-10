'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Button from '@/components/Button';
import { TProfileDB } from '@/types/types';
import { useUser } from '@/contexts/user-context';
import { getProfileName } from '@/functions/profile-actions';

import ProfileHeader from '@/components/ProfileHeader';
import { Separator } from '@/components/ui/separator';

const ProfileScreen = ({ id }: { id?: string }) => {
  const { userData: currentUserData } = useUser();
  const [userData, setUserData] = useState<TProfileDB | null>(null);
  const [isUserProfil, setIsUserProfile] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (id) {
        const { data } = await getProfileName({ user_name: id });
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
  }, [id, currentUserData]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-start">
        <header className="w-full flex justify-between items-center p-4 md:px-12 h-fit relative">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft size={24} />
          </Link>
        </header>
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
      <ProfileHeader
        isUserProfil={isUserProfil}
        isMyProfile={id ? false : true}
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
      <p className="text-xs">
        Cliquez sur les 3 petits points pour modifier votre profil.
      </p>
      <Separator className="w-[80%] bg-gray-400 my-5 " />
      <div className="flex flex-col items-center justify-center gap-y-4 px-4 text-center">
        <p className="font-bold text-xl">
          Des idées pour améliorer l&apos;application ?
        </p>
        <p className="text-justify">
          N&apos;hésite pas à nous donner ton avis : ce que tu aimes, ce que tu
          n&apos;aimes pas, ce que tu aimerais voir dans l&apos;application, ce
          qui ne sert à rien...
          <br />
          Ca nous aide à améliorer l&apos;application pour toi et les autres !
        </p>
        <Link href="mailto:derkap.dev@gmail.com">
          <Button
            text="
        Donner mon avis"
          />
        </Link>
      </div>
    </div>
  );
};

export default ProfileScreen;
