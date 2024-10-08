'use client';
import { cn } from '@/libs/utils';
import { useState } from 'react';
import CaptureScreen from '@/screens/CaptureScreen';
import Button from '@/components/Button';
import { TChallengeDB, TGroupDB, TPostDB } from '@/types/types';
import CarouselComponent from '../CarousselComponent';
import { CarouselItem } from '../ui/carousel';
import Image from 'next/image';

interface PostNotTakenProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: TPostDB[] | undefined;
  fetchAllGroupData: () => Promise<void>;
  challenge: TChallengeDB;
}

const PostNotTaken = ({
  className,
  posts,
  challenge,
  fetchAllGroupData,
  ...props
}: PostNotTakenProps) => {
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  return (
    <div {...props} className={cn('', className)}>
      {isCapturing ? (
        <CaptureScreen
          setIsCapturing={setIsCapturing}
          fetchAllGroupData={fetchAllGroupData}
          challenge={challenge}
        />
      ) : (
        <div className="w-full flex flex-col items-center gap-2 relative">
          {posts && posts.length > 0 ? (
            <CarouselComponent>
              {posts.map((post, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={post.img_url}
                    alt="post"
                    width={300}
                    height={300}
                    className="blur-2xl"
                  />
                </CarouselItem>
              ))}
            </CarouselComponent>
          ) : (
            <div className="aspect-square w-full rounded-md bg-gray-400"></div>
          )}
          <div className="abs-center flex flex-col gap-4">
            <p className="text-xl font-champ text-center">À vous de jouer !</p>
            <Button
              text="Poster votre Derkap"
              onClick={() => setIsCapturing(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostNotTaken;
