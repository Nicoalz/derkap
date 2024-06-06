'use client';
// import Capture from '@/components/Capture';
import CaptureButton from '@/components/CaptureButton';
import CaptureHook from '@/components/CaptureHook';
import ChallengerBox from '@/components/ChallengeBox';
import Feed from '@/components/Feed';
import { TPost } from '@/types';
import React, { useState } from 'react';
import { postsMocked } from '../libs/postsData';
const HomeScreen: React.FC = () => {
  const [isCaptureOpen, setIsCaptureOpen] = useState(false)
  const [allPosts, setAllPosts] = useState<TPost[]>(postsMocked);

  const addNewPost = (newPost: TPost) => {
    setAllPosts([newPost, ...allPosts]);
  }

  return (
    <div className="w-full flex flex-col items-center relative flex-1 mb-32">
      <ChallengerBox />
      {isCaptureOpen ? (
        <CaptureHook
          setIsCaptureOpen={setIsCaptureOpen}
          addNewPost={addNewPost}
        />
      ) : (
        <Feed allPosts={allPosts} />
      )}
      {!isCaptureOpen && (
        <CaptureButton
          func={() => setIsCaptureOpen(true)}
        />
      )}
    </div>
  );
};

export default HomeScreen;
