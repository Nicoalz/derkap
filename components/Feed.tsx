import { TPost } from '@/types';
import React from "react";
import Post from "./Post";

const Feed: React.FC<{ posts: TPost[] }> = ({ posts }) => {

  return (
    <div className='flex flex-col w-full'>
      <h1 className='font-bold text-2xl px-2'>Vos amis</h1>
      <div className='w-full flex flex-col items-center justify-center'>
        {posts.map((post, index) => (
          <Post key={index} postData={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
