'use client';
import { cn } from '@/libs/utils';
import { TPostDB, TGroupDB } from '@/types/types';

interface PostTakenProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: TPostDB[] | undefined;
  group: TGroupDB | undefined;
}

const PostTaken = ({ className, posts, group, ...props }: PostTakenProps) => {
  return (
    <div
      {...props}
      className={cn(
        'aspect-square w-full rounded-md bg-gray-400 flex items-center justify-center flex-col text-white',
        className,
      )}
    >
      <p>En attente du Derkap de tes potes ! </p>
      <p>
        {posts?.length} / {group?.members?.length}
      </p>
    </div>
  );
};

export default PostTaken;
