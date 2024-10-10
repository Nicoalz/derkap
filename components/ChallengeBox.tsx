'use client';
import { useState } from 'react';
import { cn } from '../libs/utils';
import { TChallengeDB } from '@/types/types';

interface ChallengeBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  challenge?: TChallengeDB;
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
        <div className="min-h-16 max-h-fit flex w-full px-4 bg-custom-white border border-custom-black rounded-xl py-2 text-custom-black shadow-element gap-4 items-center">
          <div className="w-10 h-10 aspect-square flex items-center justify-center">
            <p className="text-3xl text-center">{challenge ? '😹' : '🥱'}</p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm font-champ text-custom-black line-clamp-2 ">
              {challenge ? challenge.description : 'Pas de défi...'}
            </p>
            <div className="flex items-center gap-1">
              <p className="text-sm line-clamp-1">
                {challenge
                  ? 'Par ' + challenge.creator?.username
                  : 'Créez en un dès maintenant !'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeBox;
