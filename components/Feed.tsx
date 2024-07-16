import ChallengerBox from '@/components/ChallengeBox';
import { useUser } from '@/contexts/user-context';
import { TFeed, TPostDb } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import PullToRefresh from 'react-simple-pull-to-refresh';
import { getPosts as fetchPostsDb } from '../functions/supabase/post/get-post';
import { mockedChallenges } from '../libs/mockedChallenges';
import { postsMocked } from '../libs/postsData';
import { TChallenge } from '../types/Challenge';
import Post from "./Post";
import { Skeleton } from './ui/skeleton';

const Feed: React.FC = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(true);
  const [challenge, setChallenge] = useState<TChallenge>(mockedChallenges[0]);
  const { userFeeds, selectedFeed, setSelectedFeed } = useUser();

  const [activePosts, setActivePosts] = useState<TPostDb[]>([]);

  const fetchFeedPosts = async (feed: TFeed): Promise<TPostDb[]> => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // represents a fetch call

    // const fetchedPosts = postsMocked
    const { data: fetchedPosts } = await fetchPostsDb();
    if (fetchedPosts === null) return [];

    localStorage.setItem('posts', JSON.stringify(fetchedPosts));
    return fetchedPosts.filter(post => post.feed === feed.name) as TPostDb[];
  }

  const getLocalPosts = (feed: TFeed) => {
    const localStoredPosts = localStorage.getItem('posts');
    if (localStoredPosts) {
      const posts = JSON.parse(localStoredPosts);
      console.log({ posts })
      const feedPosts = posts.filter((post: TPostDb) => post.feed === feed.name);
      console.log({
        step: "getLocalPosts",
        feedPosts,
        posts,
      })
      return feedPosts;
    }
    return []
  }

  const updatePosts = async () => {
    try {
      setisLoading(true);
      const localStoredPosts = getLocalPosts(selectedFeed);
      console.log({ localStoredPosts })
      if (localStoredPosts?.length > 0) {
        setActivePosts(localStoredPosts);
      }
      const fetchedPosts = await fetchFeedPosts(selectedFeed);
      const posts = [...fetchedPosts, ...localStoredPosts];
      const uniqPosts = posts.filter((post, index, self) => {
        return index === self.findIndex((t) => (
          t.id === post.id
        ))
      })
      setActivePosts(uniqPosts);
      setisLoading(false);
    } catch (error) {
      console.error(error)
      setisLoading(false);
    }
  }

  const updateChallenge = () => {
    const challenge = mockedChallenges.find((challenge) => challenge.kapsId === selectedFeed.kapsId);
    if (challenge) {
      setChallenge(challenge);
    }
  }

  useEffect(() => {
    updateChallenge()
    updatePosts();
  }, [selectedFeed]);

  const handleRefresh = async () => {
    console.log('refreshing');
    await updatePosts();
  }

  return (
    <div className='relative flex flex-col w-full gap-8 -mt-4'>
      <div className='sticky top-0 bg-custom-pink/40 bg-blur'>
        <PullToRefresh pullingContent={""} onRefresh={handleRefresh}>
          <div >
            <div className='w-full pt-4 pb-8 rounded-b-xl'>
              <ul className='mobile-container w-full flex justify-start items-end gap-2 overflow-scroll no-scrollbar'>
                {userFeeds.map((feed, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (selectedFeed === feed) return;
                      setActivePosts([]);
                      setSelectedFeed(feed)
                    }}
                    className={`px-4 py-2 whitespace-nowrap cursor-pointer text-lg ${selectedFeed.id === feed.id ? 'border-b-2 border-custom-black font-bold text-custom-black'
                      : 'border-b-0 text-custom-gray'
                      }`}
                  >
                    {feed.name}
                  </li>
                ))}
              </ul>
              <div className='w-full px-2 mt-8'>
                <ChallengerBox
                  onClick={() => {
                    //redirect to challenge page
                    router.push(`/capture?challengeId=${challenge.id}`)
                  }}
                  challenge={challenge} />
              </div>
            </div>
          </div>
        </PullToRefresh>
      </div>
      <div className='w-full flex flex-col items-center justify-center gap-4 -mt-8'>
        {activePosts.length > 0 ? activePosts.map((post, index) => (
          <Post key={index} postData={post} />
        )) :
          <div className='flex flex-col justify-center items-center w-full'>
            {isLoading ? (
              <div className='w-full flex flex-col items-center justify-center'>
                <Skeleton className="w-full h-14" />
                <Skeleton className="w-full h-96 my-2" />
                <Skeleton className="w-full h-20" />
              </div>
            ) : (
              <><p className='text-4xl font-bold mt-4'>😢</p><p className='text-gray-500 text-xl mt-2'>Aucun post pour le moment </p></>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default Feed;
