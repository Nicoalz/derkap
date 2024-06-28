import { useUser } from '@/contexts/user-context';
import { TPostDb } from '@/types';
import Image from 'next/image';
import ChallengerBox from '@/components/ChallengeBox';
import React, { useEffect, useState } from "react";
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


  return (
    <div className='flex flex-col w-full gap-8'>
      <ul className='flex justify-start items-end gap-2 px-4'>
        {userFeeds.map((feed, index) => (
          <li
            key={index}
            onClick={() => setSelectedFeed(feed)}
            className={`px-4 py-2 cursor-pointer font-bold border border-black rounded-full ${selectedFeed === feed ? 'text-custom-primary' : 'text-gray-500 text-base'
              }`}
          >
            {feed}
          </li>
        ))}
      </ul>
      <ChallengerBox />
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
