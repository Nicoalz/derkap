'use client';

import React, { useState } from 'react';
import { cn } from '../lib/utils';

import Button from '@/components/Button';
import ChallengerBox from '@/components/ChallengeBox';
import GroupeHeader from '@/components/GroupeHeader';
import CarouselComponent from '@/components/CarousselComponent';
import { CarouselItem } from '@/components/ui/carousel';

const GroupScreen = ({ id }: { id: string }) => {
  const [isChallenge, setIsChallenge] = useState<boolean>(false);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const [challengeStatus, setChallengeStatus] = useState<
    'posting' | 'voting' | 'ended'
  >('posting');
  const totalElements = 10;
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

  return (
    <div className="h-screen">
      <GroupeHeader title="Groupe Name">
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

      <div className="w-full flex items-start justify-center px-6 py-3">
        {Array.from({ length: totalElements })
          .slice(0, limitElements)
          .map((_, index) => (
            <div
              className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
              style={{ zIndex: totalElements - index }}
              key={index}
            >
              <img
                src={`https://picsum.photos/10${index}`}
                className={`min-w-10 min-h-10 max-h-10 max-w-10 rounded-full`}
              />
            </div>
          ))}

        {Array.from({ length: totalElements }).length > limitElements && (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border border-custom-black rounded-full -ml-2 flex items-center justify-center">
              <p className="text-lg text-custom-black">
                +{totalElements - limitElements}
              </p>
            </div>
          </div>
        )}
      </div>

      {
        !isChallenge && !isVoting && !isEnded &&
        <div className="w-full h-[80%] flex flex-col items-center justify-around">
          <p>
            Pas de challenge pour le moment... <br /> Lancer le premier dès
            maintenant !
          </p>
          <Button text="+" onClick={() => setIsChallenge(true)} />
        </div>
      }

      {isChallenge &&
        <div className="w-full h-[80%] flex flex-col items-center justify-start gap-8 px-6 py-3">
          <ChallengerBox />
          <div className="aspect-square w-full rounded-md bg-gray-400 flex items-center justify-center">
            <p className="text-white">C’est le moment réaliser ton défi !</p>
          </div>
          <Button text="Prends ton Derkap" onClick={
            () => {
              setIsVoting(true);
              setIsChallenge(false);
              setChallengeStatus('voting');
            }
          } />
        </div>
      }

      {
        isVoting &&
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
          <Button text="Voter" onClick={
            () => {
              setIsEnded(true);
              setIsVoting(false);
              setChallengeStatus('ended');
            }
          } />
        </div>
      }

      {
        isEnded &&
        <div className="w-full h-[80%] flex flex-col items-center justify-start gap-8 px-6 py-3">
          <ChallengerBox />
          <div className="aspect-square w-full rounded-md bg-gray-400 flex items-center justify-center">
            <p className="text-white">Le défi est terminé !</p>
          </div>
          <Button text="Relancer dès mainteant un défi !" onClick={
            () => {
              setIsChallenge(true);
              setIsEnded(false);
              setChallengeStatus('posting');
            }
          } />
        </div>
      }
    </div>
  );
};

export default GroupScreen;
