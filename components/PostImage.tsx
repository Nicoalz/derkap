import React from 'react';
import ReactionBar from './ReactionBar';
interface PostImageProps {
  src: string;
  alt: string;
  username: string | null;
  description: string | null;
}



const PostImage: React.FC<PostImageProps> = ({ src, alt, username, description }) => {
  return (
    <div className="w-full relative h-0  pb-[125%]">
      <div className='absolute object-cover inset-0 h-full w-full'>
        <img loading="lazy" src={src} alt='img taken' className='object-cover w-full h-full' />
      </div>
      <div className='absolute bottom-2 w-full'>
        <ReactionBar />
      </div>

    </div>
  );
};

export default PostImage;
