'use client';
import { useState } from 'react';
import { cn } from '../libs/utils';
import { TChallengeDB } from '@/types/types';

interface ChallengeBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  challenge: TChallengeDB;
}

const ChallengeBox = ({
  challenge,
  className,
  ...props
}: ChallengeBoxProps) => {
  const [isLoading] = useState(false);

  return (
    <div {...props} className={cn('w-full', className)}>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div className="h-24 flex w-full px-4 bg-custom-white border border-custom-black rounded-xl py-2 text-custom-black shadow-element gap-4 items-center">
          <p className="text-[3rem] ">{challenge ? '😹' : '😢'}</p>
          <div className="text-left">
            {/* <h1 className="font-bold uppercase text-lg font-champ">
              {'Derkap du jour'}
            </h1> */}
            <p className="text-sm font-champ text-custom-black">
              {challenge ? challenge.description : 'Reviens plus tard'}
            </p>
            <p className="text-sm">
              {challenge
                ? 'Créé par ' + challenge.creator?.username
                : 'Reviens plus tard'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeBox;
