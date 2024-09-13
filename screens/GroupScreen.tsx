'use client';

import React, { useState } from "react";
import Header from "@/components/Header";
import { cn } from '../lib/utils';
import Button from "@/components/Button";

const GroupScreen = ({ id }: { id: string }) => {
  const [challengeStatus, setChallengeStatus] = useState<'posting' | 'voting' | 'ended'>('posting');
  const [isChallenge, setIsChallenge] = useState<boolean>(false);
  const totalElements = 15;
  const limitElements = 8;

  const statusColorMap: { [key in 'posting' | 'voting' | 'ended']: string } = {
    posting: 'bg-orange-500',
    voting: 'bg-yellow-400',
    ended: 'bg-gray-500',
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
      <Header title='Groupe Name'>
        <p className={cn('text-white py-1 px-2 rounded-xl text-sm', statusColorMap[challengeStatus])}>
          {status()}
        </p>
      </Header>

      <div className='w-full flex items-start justify-center'>
        {Array.from({ length: totalElements })
          .slice(0, limitElements)
          .map((_, index) => (
            <div className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`} style={{ zIndex: totalElements - index }} key={index}>
              <img
                src={`https://picsum.photos/${index}00`}
                className={`min-w-10 min-h-10 max-h-10 max-w-10 rounded-full`}
              />
              {/* <p className='text-[10px] text-wrap overflow-hidden text-ellipsis max-w-8'>img {index + 1}</p> */}
            </div>
          ))}

        {Array.from({ length: totalElements }).length > limitElements && (
          <div className='flex flex-col items-center'>
            <div className="w-10 h-10 border border-custom-black rounded-full -ml-2 flex items-center justify-center">
              <p className="text-lg text-custom-black">+{totalElements - limitElements}</p>
            </div>
          </div>
        )}
      </div>


      <div className='w-full h-[80%] flex flex-col items-center justify-between'>
      {
        isChallenge ? (
          <>
          
          </>
        ) : (
          <>
            <p>Pas de challenge pour le moment... <br /> Lancer le premier dès maintenant !</p>
            <Button text="+" onClick={() => setIsChallenge(true)} />
          </>
        )
      }
      </div>

    </div>
  );
}

export default GroupScreen;
