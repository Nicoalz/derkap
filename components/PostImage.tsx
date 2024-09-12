import React from 'react';
import { Json } from '../types/supabase';
import ReactionBar from './ReactionBar';

interface PostImageProps {
  id: number;
  src: string;
  alt: string;
  username: string | null;
  description: string | null;
  reactions: Json[] | null;
}

const PostImage: React.FC<PostImageProps> = ({ id, src, alt, username, description, reactions }) => {
  return (
    <div className="w-full relative h-0  pb-[125%]">
      <div className='absolute object-cover inset-0 h-full w-full'>
        <img src={src} alt='img taken' className='object-cover w-full h-full' />
      </div>
      <div className='absolute bottom-2 w-full'>
        <ReactionBar post_id={id} reactions={reactions} />
      </div>

    </div>
  );
};

export default PostImage;
