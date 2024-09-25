'use client';
import { cn } from '@/libs/utils';
import Button from '@/components/Button';

interface NoChallengeProps extends React.HTMLAttributes<HTMLDivElement> {
  setIsCreateChallengeOpen: (value: boolean) => void;
}

const NoChallenge = ({
  setIsCreateChallengeOpen,
  className,
  ...props
}: NoChallengeProps) => {
  return (
    <div
      {...props}
      className={cn(
        'w-full h-[80%] flex flex-col items-center justify-around',
        className,
      )}
    >
      <p>
        Pas de défi pour le moment... <br /> Lancer le premier dès maintenant !
      </p>
      <Button text="+" onClick={() => setIsCreateChallengeOpen(true)} />
    </div>
  );
};

export default NoChallenge;
