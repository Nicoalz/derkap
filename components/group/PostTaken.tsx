'use client';

import { cn } from '@/libs/utils';
import { TPostDB, TGroupDB, TChallengeDB } from '@/types/types';
import { useUser } from '@/contexts/user-context';
import Button from '../Button';
import DrawerComponent from '@/components/DrawerComponent';
import { useState } from 'react';
import { setChallengeToVoting } from '@/functions/challenge-action';
import { toast } from 'sonner';
import CarouselComponent from '../CarousselComponent';
import { CarouselItem } from '../ui/carousel';
import Image from 'next/image';
import { Separator } from '@radix-ui/react-separator';
import Link from 'next/link';

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

  const getWhoDontPost = () => {
    if (!group || !posts) return [];
    const groupMembers = group.members;
    const postsProfiles = posts.map(post => post.profile_id);
    return groupMembers.filter(
      member => !postsProfiles.includes(member.profile?.id ?? ''),
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        {...props}
        className={cn(
          'aspect-square w-full rounded-md bg-gray-300 flex items-center justify-center flex-col text-white gap-y-4',
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
            <div className="flex flex-col gap-4">
              <p className="text-xs">
                En tant que créateur du défi, tu peux décider de passer aux
                votes, sans attendre que tous les participants aient posté leur
                Derkap.
              </p>
              <p className="text-xs font-bold">
                Attention, une fois les votes lancés, les participants ne
                pourront plus poster leur Derkap.
              </p>
            </div>
            <Button text="Confirmer" onClick={handleGoVote} />
          </div>
        </DrawerComponent>

        <div className="h-full w-full overflow-hidden rounded-md relative">
          <CarouselComponent>
            {posts?.map((post, index) => (
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
          <div className="abs-center flex flex-col items-center text-center gap-4 font-champ">
            <p className="text-xl w-fit">
              En attente de tous les participants !
            </p>
            <p className="text-4xl w-fit">
              {posts?.length} / {group?.members?.length}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <p className="text-xl font-champ">Toujours en retard...</p>
        <div className="w-full flex flex-col gap-2">
          {getWhoDontPost().map((member, index) => (
            <Link
              key={index}
              className="text-s"
              href={`/profile/${member?.profile?.username}`}
            >
              @{member.profile?.username}
            </Link>
          ))}
        </div>
      </div>

      {challenge?.creator_id === currentUserData.id && (
        <div className="fixed w-full bg-[#f8e9db] bottom-0 right-0">
          <div className="relative px-4 pb-8 pt-4">
            <div className="before:absolute before:left-0 before:-top-[1.6rem] before:z-[2] before:w-full before:h-[30px] before:bg-gradient-to-t before:from-[#f8e9db] before:to-[#f8e9db]/0 before:content-['']"></div>
            <Button
              text="Passer aux votes"
              className="w-full"
              onClick={() => {
                setIsGoVoteOpen(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostTaken;
