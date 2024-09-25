'use client';
import { cn } from '@/libs/utils';
import Button from '@/components/Button';
import CarouselComponent from '@/components/CarousselComponent';
import { CarouselItem } from '@/components/ui/carousel';
import { TPostDB } from '@/types/types';

interface VotingProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: TPostDB[];
}

const Voting = ({ posts, className, ...props }: VotingProps) => {
  const handleVote = () => {
    // console.log('Voted');
  };

  return (
    <div {...props} className={cn('', className)}>
      <CarouselComponent>
        {posts.map((_, index) => (
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
          handleVote();
        }}
      />
    </div>
  );
};

export default Voting;
