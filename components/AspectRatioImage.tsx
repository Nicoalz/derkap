import Image from 'next/image';
import React from 'react';

interface AspectRatioImageProps {
  src: string;
  alt: string;
  username: string;
  description?: string;
}



const AspectRatioImage: React.FC<AspectRatioImageProps> = ({ src, alt, description, username }) => {
  return (
    <>
      <div className="relative w-full pb-[125%] overflow-hidden">
        <Image className='absolte top-0 left-0 w-full h-full object-cover' src={src} alt={alt} layout="fill" objectFit="cover" />
      </div>
      <div className='flex'>
        <p className='font-bold mr-2'>{username}</p>
        <p>{description}</p>
      </div>
    </>
  );
};

export default AspectRatioImage;
