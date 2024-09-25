'use client';
import { cn } from '@/libs/utils';
import Button from '@/components/Button';
import CarouselComponent from '@/components/CarousselComponent';
import { CarouselItem } from '@/components/ui/carousel';
import { TPostDB } from '@/types/types';
import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { voteForPost } from '@/functions/post-action';

interface VotingProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: TPostDB[];
  fetchAllGroupData: () => Promise<void>;
}

const Voting = ({
  posts,
  fetchAllGroupData,
  className,
  ...props
}: VotingProps) => {
  // todo: display votes count, and who I voted for, If I vote again, it should remove the previous vote
  const [selectedPost, setSelectedPost] = useState<TPostDB | null>(null);

  const handleVote = async () => {
    // try {
    //   if (!selectedPost) return toast.error('Aucun post sélectionné');
    //   await voteForPost({ post_id: selectedPost.id });
    // } catch (error) {
    //   toast.error('Erreur lors du vote');
    // } finally {
    //   await fetchAllGroupData();
    // }
  };

  return (
    <div
      {...props}
      className={cn('w-full flex flex-col items-center gap-y-2', className)}
    >
      <CarouselComponent>
        {posts.map((post, index) => (
          <CarouselItem onClick={() => setSelectedPost(post)} key={index}>
            <Image
              className={cn(
                'rounded-md',
                selectedPost === post && 'border-4 border-custom-primary',
              )}
              src={post.img_url}
              alt="post"
              width={300}
              height={300}
            />
            <p>@{post.creator?.username}</p>
          </CarouselItem>
        ))}
      </CarouselComponent>
      <Button
        text="Voter"
        isCancel={!selectedPost}
        onClick={() => {
          handleVote();
        }}
      />
    </div>
  );
};

export default Voting;
