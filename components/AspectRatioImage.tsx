import Image from 'next/image';
import React from 'react';

interface AspectRatioImageProps {
  src: string;
  alt: string;
  username: string | null;
  description: string | null;
}



const AspectRatioImage: React.FC<AspectRatioImageProps> = ({ src, alt, username, description}) => {
  return (
    // <div className='relative'>
    //   {/* <Image className='w-full h-auto object-cover aspect-image' src={src} alt={alt} layout="fill" objectFit="" /> */}
    //   <img src={src} alt={alt} className='w-full h-auto object-cover aspect-image' />
    //   {username && description && (
    //   <div className='absolute gap-x-2 flex bottom-0 left-0 text-xs px-2 py-2 bg-black/40 w-full'>
    //       <p className='text-white'>{username}:</p>
    //     <p className='text-white font-light'>{description}</p>
    //   </div>
    //   )}
    // </div>
    <div className="w-full relative h-0  pb-[125%]">

      <div className='absolute object-cover inset-0 h-full w-full'>

        <img src={src} alt='img taken' className='object-cover w-full h-full' />
      </div>

    </div>
  );
};

export default AspectRatioImage;
