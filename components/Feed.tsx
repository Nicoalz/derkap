import ChallengerBox from '@/components/ChallengeBox';
import { useUser } from '@/contexts/user-context';
import { TPostDb } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { TDerkap } from '../types/Derkap';
import Post from "./Post";
const Feed: React.FC<{ allPosts: TPostDb[] }> = ({ allPosts }) => {
  const { userFeeds, selectedFeed, setSelectedFeed } = useUser();

  const [activePosts, setActivePosts] = useState<TPostDb[]>([]);

  const getFeedPosts = (feed: string): TPostDb[] => {
    return allPosts.filter(post => post.feed === feed);
  }

  const updatePosts = () => {
    setActivePosts(getFeedPosts(selectedFeed));
  }

  useEffect(() => {
    updatePosts();
  }, [selectedFeed, allPosts]);


  const defaultDerkap: TDerkap = {
    id: 0,
    title: 'DERKAP du jour ',
    subtitle: 'Chauve qui peut !',
    description: 'Prends une photo de toi avec un chauve !',
    icone: '👨‍🦲'
  }


  return (
    <div className='flex flex-col w-full gap-8'>
      <ul className='flex justify-start items-end gap-2'>
        {userFeeds.map((feed, index) => (
          <li
            key={index}
            onClick={() => setSelectedFeed(feed)}
            className={`px-4 py-2 cursor-pointer font-bold text-lg ${selectedFeed === feed ? 'border-b-2 border-custom-black text-custom-black'
              : 'border-b-0 text-custom-gray'
              }`}
          >
            {feed}
          </li>
        ))}
      </ul>
      <ChallengerBox derkap={defaultDerkap} />
      <div className='w-full flex flex-col items-center justify-center'>
        {activePosts.length > 0 ? activePosts.map((post, index) => (
          <Post key={index} postData={post} />
        )) :
          <div className='flex flex-col justify-center items-center mt-8'>
            <Image src='/mrderkasad.png' width={150} height={150} alt='MrDerka Sad' />
            <p className='text-gray-500 text-xl mt-2'>Aucun post pour le moment </p>
          </div>
        }
      </div>
    </div>
  );
};

export default Feed;
