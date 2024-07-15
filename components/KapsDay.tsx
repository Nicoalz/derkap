"use client";

import Image from 'next/image';
import React from 'react';

interface KapsDayProps extends React.HTMLAttributes<HTMLDivElement> {
  images?: string[];
}

const KapsDay: React.FC<KapsDayProps> = ({ className, images, ...props }) => {
  return (
    <div className={`w-full ${className}`} {...props}>
      <h2 className='text-2xl font-bold mb-4 font-champ'>Derkaps du jour</h2>
      <div className='grid grid-cols-3 gap-2'>
        {images && images.length > 0 ? (
          images.map((src, index) => (
            <div key={index} className='relative h-36 pb-full'>
              <Image src={src} layout='fill' objectFit='cover' alt={`image-${index}`} className='object-cover rounded-lg' />
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No images available</p>
        )}
      </div>
    </div>
  );
}

export default KapsDay;
