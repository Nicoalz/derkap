import Image from 'next/image';
import React from 'react';

interface AspectRatioImageProps {
  src: string;
  alt: string;
}



const AspectRatioImage: React.FC<AspectRatioImageProps> = ({ src, alt}) => {
  return (
    <>
      {/* <Image className='w-full h-auto object-cover aspect-image' src={src} alt={alt} layout="fill" objectFit="" /> */}
      <img src={src} alt={alt} className='w-full h-auto object-cover aspect-image' />
    </>
  );
};

export default AspectRatioImage;
