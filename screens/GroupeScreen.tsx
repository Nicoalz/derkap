'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

import Button from '@/components/Button';
import ChallengerBox from '@/components/ChallengeBox';
import GroupeHeader from '@/components/GroupeHeader';
import CarouselComponent from '@/components/CarousselComponent';
import { CarouselItem } from '@/components/ui/carousel';
import { getGroups } from '@/functions/group-action';
import { TGroupDB } from '@/types/types';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const GroupScreen = ({ id }: { id: string }) => {
  const [isLoadding, setIsLoadding] = useState<boolean>(true);
  const [groupeData, setGroupeData] = useState<TGroupDB>();
  const [isChallenge, setIsChallenge] = useState<boolean>(false);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const [challengeStatus, setChallengeStatus] = useState<
    'posting' | 'voting' | 'ended'
  >('posting');
  const limitElements = 5;

  const statusColorMap: { [key in 'posting' | 'voting' | 'ended']: string } = {
    posting: 'bg-orange-400',
    voting: 'bg-yellow-400',
    ended: 'bg-gray-400',
  };

  const status = () => {
    if (challengeStatus === 'posting') {
      return 'En cours';
    } else if (challengeStatus === 'voting') {
      return 'À voter';
    } else if (challengeStatus === 'ended') {
      return 'Terminé';
    }
  };

  const handleGetGroups = async () => {
    const { data, error } = await getGroups({});
    if (error) return console.error(error);
    if (data) {
      const group = data.filter((group: TGroupDB) => group.id === Number(id));
      setGroupeData(group[0]);
      setIsLoadding(false);
    }
  };

  const membresGroup = groupeData?.members.filter(
    (member, index, self) =>
      index === self.findIndex(t => t.profile?.id === member.profile?.id),
  );

  useEffect(() => {
    handleGetGroups();
  }, []);

  if (isLoadding) {
    return (
      <div className="h-screen">
        <header className="w-full flex justify-between items-center p-6 md:px-12 h-fit relative">
          <Link href="/" className="flex items-center gap-x-2">
            <ChevronLeft size={24} />
          </Link>
          <Skeleton className="w-52 h-8 rounded abs-center" />
          <Skeleton className="h-5 w-16" />
        </header>
        <div className="w-full flex items-start justify-center px-6 py-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
              style={{ zIndex: 5 - index }}
              key={index}
            >
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          ))}
        </div>

        <div className="w-full h-[80%] flex flex-col items-center justify-start gap-8 px-6 py-3">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full aspect-square" />
          <Skeleton className="py-2 px-4 text-sm text-transparent">
            Prends ton Derkap
          </Skeleton>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <GroupeHeader groupeData={groupeData}>
        {(isChallenge || isVoting || isEnded) && (
          <div
            className={cn(
              'rounded-md px-2.5 py-0.5 text-xs font-semibold text-white',
              statusColorMap[challengeStatus],
            )}
          >
            <p className="text-center">{status()}</p>
          </div>
        )}
      </GroupeHeader>

      <ul className="list-none w-full flex items-start justify-center px-6 py-3">
        {membresGroup?.slice(0, limitElements).map((member, index) =>
          member.profile?.avatar_url ? (
            <Link
              href={`/profile/${member.profile?.username}`}
              className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
              style={{ zIndex: membresGroup.length - index }}
              key={index}
            >
              <img
                src={member.profile.avatar_url || undefined}
                className={`min-w-10 min-h-10 max-h-10 max-w-10 rounded-full`}
              />
            </Link>
          ) : (
            <Link
              href={`/profile/${member.profile?.username}`}
              className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
              style={{ zIndex: membresGroup.length - index }}
              key={index}
            >
              <p className="flex items-center justify-center w-10 h-10 rounded-full border bg-custom-white">
                {member.profile?.username?.charAt(0)}
              </p>
            </Link>
          ),
        )}

        {membresGroup && membresGroup.length > limitElements && (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border border-custom-black rounded-full -ml-2 flex items-center justify-center">
              <p className="text-lg text-custom-black">
                +{groupeData?.members.length ? -limitElements : 0}
              </p>
            </div>
          </div>
        )}
      </ul>

      {!isChallenge && !isVoting && !isEnded && (
        <div className="w-full h-[80%] flex flex-col items-center justify-around">
          <p>
            Pas de challenge pour le moment... <br /> Lancer le premier dès
            maintenant !
          </p>
          <Button text="+" onClick={() => setIsChallenge(true)} />
        </div>
      )}

      {isChallenge && (
        <div className="w-full h-[80%] flex flex-col items-center justify-start gap-8 px-6 py-3">
          <ChallengerBox />
          <div className="aspect-square w-full rounded-md bg-gray-400 flex items-center justify-center">
            <p className="text-white">C’est le moment réaliser ton défi !</p>
          </div>
          <Button
            text="Prends ton Derkap"
            onClick={() => {
              setIsVoting(true);
              setIsChallenge(false);
              setChallengeStatus('voting');
            }}
          />
        </div>
      )}

      {isVoting && (
        <div className="w-full h-[80%] flex flex-col items-center justify-start gap-8 px-6 py-3">
          <ChallengerBox />
          <CarouselComponent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square w-full rounded-md bg-gray-400 flex items-center justify-center">
                  <p className="text-white">{index + 1}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselComponent>
          <Button
            text="Voter"
            onClick={() => {
              setIsEnded(true);
              setIsVoting(false);
              setChallengeStatus('ended');
            }}
          />
        </div>
      )}

      {isEnded && (
        <div className="w-full h-[80%] flex flex-col items-center justify-start gap-8 px-6 py-3">
          <ChallengerBox />
          <div className="aspect-square w-full rounded-md bg-gray-400 flex items-center justify-center">
            <p className="text-white">Le défi est terminé !</p>
          </div>
          <Button
            text="Relancer dès mainteant un défi !"
            onClick={() => {
              setIsChallenge(true);
              setIsEnded(false);
              setChallengeStatus('posting');
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GroupScreen;
