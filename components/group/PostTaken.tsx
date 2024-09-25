'use client';
import { cn } from '@/libs/utils';
import { TPostDB, TGroupDB, TChallengeDB } from '@/types/types';
import { useUser } from '@/contexts/user-context';
import Button from '../Button';
import DrawerComponent from '@/components/DrawerComponent';
import { useState } from 'react';
import { setChallengeToVoting } from '@/functions/challenge-action';
import { toast } from 'sonner';

interface PostTakenProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: TPostDB[] | undefined;
  group: TGroupDB | undefined;
  challenge: TChallengeDB;
  fetchAllGroupData: () => Promise<void>;
}

const PostTaken = ({
  className,
  posts,
  challenge,
  group,
  fetchAllGroupData,
  ...props
}: PostTakenProps) => {
  const { userData: currentUserData } = useUser();
  const [isGoVoteOpen, setIsGoVoteOpen] = useState<boolean>(false);

  const handleGoVote = async () => {
    try {
      if (!challenge) return toast.error('Challenge inconnu');
      await setChallengeToVoting({ challenge_id: challenge.id });
    } catch (error) {
      toast.error('Erreur lors du passage aux votes');
    } finally {
      await fetchAllGroupData();
    }
  };

  return (
    <div
      {...props}
      className={cn(
        'aspect-square w-full rounded-md bg-gray-400 flex items-center justify-center flex-col text-white gap-y-4',
        className,
      )}
    >
      <DrawerComponent
        trigger={null}
        title="Passer aux votes"
        isOpen={isGoVoteOpen}
        onClose={() => setIsGoVoteOpen(false)}
      >
        <div className="w-full flex flex-col p-6 gap-12 mb-12">
          <p className="text-xs">
            En tant que créateur du défi, tu peux décider de passer aux votes,
            sans attendre que tous les participants aient posté leur Derkap.
            <br />
            <span className="font-bold">
              Attention, une fois les votes lancés, les participants ne pourront
              plus poster leur Derkap.
            </span>
          </p>
          <Button text="Confirmer" onClick={handleGoVote} />
        </div>
      </DrawerComponent>

      <div className="flex flex-col items-center">
        <p>En attente du Derkap de tes potes ! </p>
        <p>
          {posts?.length} / {group?.members?.length}
        </p>
      </div>

      {challenge?.creator_id === currentUserData.id && (
        <Button
          text="Passer aux votes"
          onClick={() => {
            setIsGoVoteOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default PostTaken;
