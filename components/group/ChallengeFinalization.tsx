'use client';
import { cn } from '@/libs/utils';
import Button from '@/components/Button';
import CarouselComponent from '@/components/CarousselComponent';
import { CarouselItem } from '@/components/ui/carousel';
import { TPostDB, TVoteDB, TChallengeDB } from '@/types/types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { addVote, getVotes } from '@/functions/vote-action';
import { useUser } from '@/contexts/user-context';
import DrawerComponent from '@/components/DrawerComponent';
import { setChallengeToEnd } from '@/functions/challenge-action';
import { Skeleton } from '@/components/ui/skeleton';
interface VotingProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: TPostDB[];
  fetchAllGroupData: () => Promise<void>;
  challenge: TChallengeDB;
  setIsCreateChallengeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChallengeFinalization = ({
  posts,
  challenge,
  setIsCreateChallengeOpen,
  fetchAllGroupData,
  className,
  ...props
}: VotingProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userData } = useUser();
  const [selectedPost, setSelectedPost] = useState<TPostDB | null>(null);
  const [votes, setVotes] = useState<TVoteDB[]>([]);
  const [userVote, setUserVote] = useState<{
    voted: boolean;
    postId?: number;
  } | null>(null);
  const [isEndVoteOpen, setIsEndVoteOpen] = useState<boolean>(false);

  const handleVote = async () => {
    try {
      if (!selectedPost) return toast.error('Aucun post sélectionné');
      await addVote({
        post_id: selectedPost.id,
        challenge_id: selectedPost.challenge_id,
      });
    } catch (error) {
      toast.error('Erreur lors du vote');
    } finally {
      await fetchAllGroupData();
    }
  };

  const getVoteCount = (postId: number) => {
    return votes.filter(vote => vote.post_id === postId).length;
  };

  const getPostCreatorName = (postId?: number) => {
    if (!postId) return '';
    const post = posts.find(post => post.id === postId);
    return post?.creator?.username;
  };

  const isPostHasMoreVotes = (postId: number) => {
    const postsWithVotesCount = posts.map(post => ({
      ...post,
      votes: getVoteCount(post.id),
    }));
    const highestPostVotes = Math.max(
      ...postsWithVotesCount.map(post => post.votes),
    );
    return postsWithVotesCount.find(
      post => post.id === postId && post.votes === highestPostVotes,
    );
  };

  const handleEndVote = async () => {
    try {
      if (!challenge) return toast.error('Challenge inconnu');
      await setChallengeToEnd({ challenge_id: challenge.id });
    } catch (error) {
      toast.error('Erreur lors du passage aux votes');
    } finally {
      await fetchAllGroupData();
    }
  };

  useEffect(() => {
    try {
      const fetchVotes = async () => {
        try {
          setIsLoading(true);
          if (!challenge) return;
          const { data, error } = await getVotes({
            challenge_id: challenge.id,
          });
          if (error) {
            throw new Error('');
          } else {
            setVotes(data || []);
            const userVote = data?.find(vote => vote.user_id === userData.id);
            setUserVote({
              voted: !!userVote,
              postId: userVote?.post_id,
            });
          }
        } catch (error) {
          toast.error('Erreur lors de la récupération des votes');
        } finally {
          setIsLoading(false);
        }
      };
      fetchVotes();
    } catch (error) {
      toast.error('Erreur lors de la récupération des votes');
    }
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-[80%] flex flex-col items-center justify-start gap-8 px-6 py-3">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full aspect-square" />
        <Skeleton className="py-2 px-4 text-sm text-transparent">
          Prends ton Derkap
        </Skeleton>
      </div>
    );

  return (
    <div
      {...props}
      className={cn('w-full flex flex-col items-center gap-y-2', className)}
    >
      <DrawerComponent
        trigger={null}
        title="Fermer les votes"
        isOpen={isEndVoteOpen}
        onClose={() => setIsEndVoteOpen(false)}
      >
        <div className="w-full flex flex-col p-6 gap-12 mb-12">
          <p className="text-xs">
            En tant que créateur du défi, tu peux décider de clore les votes,
            sans attendre que tous les participants aient voté.
            <br />
            <span className="font-bold">
              Attention, une fois les votes clos, les participants ne pourront
              plus voter et le défi sera terminé.
            </span>
          </p>
          <Button text="Confirmer" onClick={handleEndVote} />
        </div>
      </DrawerComponent>
      {challenge?.status === 'ended' && (
        <p>Défi terminé ! Check les résultats:</p>
      )}

      {userVote?.voted ? (
        <p>T&apos;as voté pour {getPostCreatorName(userVote?.postId)} </p>
      ) : (
        <p>Oublie pas de voter !</p>
      )}

      <CarouselComponent>
        {posts.map((post, index) => (
          <CarouselItem onClick={() => setSelectedPost(post)} key={index}>
            <Image
              className={cn(
                'rounded-md',
                challenge?.status === 'voting' &&
                  post.id === userVote?.postId &&
                  'border-4 border-green-500',
                challenge?.status === 'voting' &&
                  selectedPost === post &&
                  'border-4 border-custom-primary',
                challenge?.status === 'ended' &&
                  isPostHasMoreVotes(post.id) &&
                  'border-4 border-yellow-500',
              )}
              src={post.img_url}
              alt="post"
              width={300}
              height={300}
            />
            <div className="flex w-full justify-between">
              <p>@{post.creator?.username}</p>
              <p>{getVoteCount(post.id)} vote(s)</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselComponent>
      {challenge?.creator_id === userData.id &&
        challenge?.status === 'voting' && (
          <>
            <Button
              text={userVote?.voted ? 'Changer mon vote' : 'Voter'}
              isCancel={!selectedPost}
              onClick={() => {
                handleVote();
              }}
            />
            <Button
              text="Fermer les votes"
              onClick={() => {
                setIsEndVoteOpen(true);
              }}
            />
          </>
        )}
      {challenge?.status === 'ended' && (
        <Button
          text="Relancer dès mainteant un défi !"
          onClick={() => setIsCreateChallengeOpen(true)}
        />
      )}
    </div>
  );
};

export default ChallengeFinalization;
