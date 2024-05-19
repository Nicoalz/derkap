import { TPost, postHeight, postWitdh } from '@/types';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from "react";
import AspectRatioImage from './AspectRatioImage';
const Post: React.FC<{ postData: TPost }> = ({ postData }) => {

  return (
    <div className='flex flex-col w-full py-4'>
      <div className='w-full justify-between flex px-2 py-2 items-center'>
        <div className='flex justify-center items-center'>
          <Image
            alt={postData.user.name}
            src={postData.user.img}
            width={30}
            height={30}
            className='rounded-full mr-2'
          />
          <p>{postData.user.name}</p>
        </div>
        <EllipsisHorizontalIcon className='w-5 h-5' />
      </div>
      {postData.isPhoto ? (
        <AspectRatioImage
          alt={postData.description}
          src={postData.url}
          username={postData.user.username}
          description={postData.description}
        />
      ) : (
        <video width={postWitdh} height={postHeight} src={postData.url} controls />
      )}
    </div>
  );
};

export default Post;
