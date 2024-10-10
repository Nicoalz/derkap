'use client';
import { cn } from '@/libs/utils';
import Button from '@/components/Button';
import ChallengeBox from '../ChallengeBox';

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
        'w-full flex flex-col items-center justify-center px-2 py-3 mt-14',
        className,
      )}
    >
      <ChallengeBox />
      <div className="fixed w-full bg-[#f8e9db] bottom-0 right-0">
          <div className="w-full relative pb-8 pt-2 flex justify-between items-center gap-2 px-2">
            <div className="absolute left-0 -top-2 z-[2] w-full h-2 bg-gradient-to-t from-[#f8e9db] to-[#f8e9db]/0 content-['']"></div>
            <Button
              className="w-full font-champ"
              text="Lancer mon premier défi !"
              onClick={() => {
                setIsCreateChallengeOpen(true);
              }}
            />
          </div>
        </div>
    </div>
  );
};

export default NoChallenge;
