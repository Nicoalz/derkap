import { TPost } from '@/types';
import React from "react";
import Post from "./Post";

const Feed: React.FC = () => {

  const posts: TPost[] = [
    {
      isPhoto: true,
      url: 'https://picsum.photos/628/1200',
      description: 'Ouais pas mal',
      user: { name: 'Thomas', username: 'N0roo', img: 'https://picsum.photos/50' },
      date: '2021-06-01',
    },
    {
      isPhoto: true,
      url: 'https://picsum.photos/228/1200',
      description: 'Téma la vue',
      user: { name: 'Augustin', username: '10gust10', img: 'https://picsum.photos/51' },
      date: '2021-06-01',
    },
    {
      isPhoto: true,
      url: 'https://picsum.photos/328/1200',
      description: "C'est ça qui me fallait",
      user: { name: 'Lorenzo', username: 'lorenzoavr_', img: 'https://picsum.photos/52' },
      date: '2021-06-01',
    },
    {
      isPhoto: true,
      url: 'https://picsum.photos/618/1200',
      description: 'Si siii Ocho',
      user: { name: 'Félix', username: 'plix_panot', img: 'https://picsum.photos/53' },
      date: '2021-06-01',
    }
  ]

  return (
    <div className='flex flex-col w-full no-scrollbar '>
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
