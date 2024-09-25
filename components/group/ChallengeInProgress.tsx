'use client';
import { cn } from '@/libs/utils';
import { useState, useEffect } from 'react';
import PostTaken from './PostTaken';
import PostNotTaken from './PostNotTaken';
import { TGroupDB, TPostDB } from '@/types/types';
import { useUser } from '@/contexts/user-context';

interface ChallengeInProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  group: TGroupDB | undefined;
  posts: TPostDB[] | undefined;
  fetchAllGroupData: () => Promise<void>;
  challenge_id: number;
}

const ChallengeInProgress = ({
  group,
  posts,
  fetchAllGroupData,
  challenge_id,
  className,
  ...props
}: ChallengeInProgressProps) => {
  // todo : recup si j'ai un post dans le challenge
  const { userData: currentUserData } = useUser();
  const [isMyPostTaken, setIsMyPostTaken] = useState<boolean>(false); // if the user has already filled the challenge

  useEffect(() => {
    if (posts) {
      console.log({ posts });
      const myPost = posts.find(post => post.profile_id === currentUserData.id);
      if (myPost) {
        setIsMyPostTaken(true);
      }
    }
  }, [posts, currentUserData]);

  return (
    <div {...props} className={cn('w-full', className)}>
      {isMyPostTaken ? (
        <PostTaken posts={posts} group={group} />
      ) : (
        <PostNotTaken
          challenge_id={challenge_id}
          fetchAllGroupData={fetchAllGroupData}
        />
      )}
    </div>
  );
};

export default ChallengeInProgress;
