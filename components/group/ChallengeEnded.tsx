'use client';
import { cn } from '@/libs/utils';
import Button from '@/components/Button';

interface ChallengeEndedProps extends React.HTMLAttributes<HTMLDivElement> {
  setIsCreateChallengeOpen: (value: boolean) => void;
}

const ChallengeEnded = ({
  setIsCreateChallengeOpen,
  className,
  ...props
}: ChallengeEndedProps) => {
  return (
    //todo : also display the voted posts
    <div {...props} className={cn('', className)}>
      <div className="aspect-square w-full rounded-md bg-gray-400 flex items-center justify-center">
        <p className="text-white">Le défi est terminé !</p>
      </div>
      <Button
        text="Relancer dès mainteant un défi !"
        onClick={() => setIsCreateChallengeOpen(true)}
      />
    </div>
  );
};

export default ChallengeEnded;
