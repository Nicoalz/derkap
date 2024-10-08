'use client';
import { cn } from '@/libs/utils';
import Button from '@/components/Button';
import CarouselComponent from '@/components/CarousselComponent';
import { CarouselApi, CarouselItem } from '@/components/ui/carousel';
import { TPostDB, TVoteDB, TChallengeDB } from '@/types/types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { addVote, getVotes } from '@/functions/vote-action';
import { useUser } from '@/contexts/user-context';
import DrawerComponent from '@/components/DrawerComponent';
import { setChallengeToEnd } from '@/functions/challenge-action';
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
  const { userData } = useUser();
  const [selectedPost, setSelectedPost] = useState<TPostDB | null>(null);
  const [votes, setVotes] = useState<TVoteDB[]>([]);
  const [userVote, setUserVote] = useState<{
    voted: boolean;
    postId?: number;
  } | null>(null);
  const [isEndVoteOpen, setIsEndVoteOpen] = useState<boolean>(false);

  const [api, setApi] = useState<CarouselApi>();
  const [currentPost, setCurrentPost] = useState(0);

  const handleVote = async () => {
    try {
      if (!selectedPost) return toast.error('Aucun post sélectionné');
      // await addVote({
      //   post_id: selectedPost.id,
      //   challenge_id: selectedPost.challenge_id,
      // });
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

  const getPostWithMostVotes = () => {
    const postsWithVotes = posts.map(post => ({
      ...post,
      voteCount: getVoteCount(post.id),
    }));
    const highestVotes = Math.max(
      ...postsWithVotes.map(post => post.voteCount),
    );
    return postsWithVotes.find(post => post.voteCount === highestVotes);
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
        }
      };
      fetchVotes();
    } catch (error) {
      toast.error('Erreur lors de la récupération des votes');
    }
  }, []);

  useEffect(() => {
    if (challenge?.status === 'ended') {
      const highestVotedPost = getPostWithMostVotes();
      if (highestVotedPost && api) {
        const postIndex = posts.findIndex(
          post => post.id === highestVotedPost.id,
        );
        if (postIndex !== -1) {
          setCurrentPost(postIndex + 1);
          api.scrollTo(postIndex);
        }
      }
    }
  }, [challenge, posts, api, votes]);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrentPost(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrentPost(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    setSelectedPost(posts[currentPost - 1]);
  }, [currentPost]);

  return (
    <div
      {...props}
      className={cn('w-full flex flex-col items-center gap-2 mb-28', className)}
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
        <p className="font-champ text-xl">
          Défi terminé ! Check les résultats:
        </p>
      )}

      <CarouselComponent setApi={setApi}>
        {posts.map((post, index) => (
          <CarouselItem onClick={() => setSelectedPost(post)} key={index}>
            <Image
              className={cn(
                'rounded-xl w-full object-cover max-h-[510px] aspect-image',
                challenge?.status === 'voting' &&
                  post.id === userVote?.postId &&
                  'border-4 border-green-500',
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
              <p className="font-champ">@{post.creator?.username}</p>
              <p className="font-champ">{getVoteCount(post.id)} vote(s)</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselComponent>

      {/* <div className="text-center">
        {currentPost} sur {posts.length}
      </div> */}

      <div className="flex items-center gap-1">
        {posts.map((post, index) => (
          <div
            key={index}
            className={cn(
              'rounded-full cursor-pointer transition-all duration-300',
              post.id === selectedPost?.id
                ? 'bg-gray-800 w-2 h-2'
                : 'bg-gray-400 w-1 h-1',
            )}
            onClick={() => {
              setCurrentPost(index + 1);
              api?.scrollTo(index);
            }}
          ></div>
        ))}
      </div>

      {challenge?.status === 'voting' && (
        <div className="fixed w-full bg-[#f8e9db] bottom-0 right-0">
          <div className="w-full relative pb-8 pt-2 flex justify-between items-center gap-2 px-2">
            <div className="absolute left-0 -top-2 z-[2] w-full h-2 bg-gradient-to-t from-[#f8e9db] to-[#f8e9db]/0 content-['']"></div>
            {challenge?.creator_id === userData.id && (
              <Button
                className="bg-purple-300 w-full font-champ"
                text="Fermer les votes"
                onClick={() => {
                  setIsEndVoteOpen(true);
                }}
              />
            )}
            <Button
              className="w-full font-champ"
              text={userVote?.voted ? 'Changer mon vote' : 'Voter'}
              isCancel={!selectedPost}
              onClick={() => {
                handleVote();
              }}
            />
          </div>
        </div>
      )}
      {challenge?.status === 'ended' && (
        <div className="fixed w-full bg-[#f8e9db] bottom-0 right-0">
          <div className="w-full relative pb-8 pt-2 flex justify-between items-center gap-2 px-2">
            <div className="absolute left-0 -top-2 z-[2] w-full h-2 bg-gradient-to-t from-[#f8e9db] to-[#f8e9db]/0 content-['']"></div>
            <Button
              className="w-full font-champ"
              text="Relancer dès mainteant un défi !"
              onClick={() => setIsCreateChallengeOpen(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeFinalization;
