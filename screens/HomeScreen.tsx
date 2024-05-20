'use client';
import Capture from '@/components/Capture';
import CaptureButton from '@/components/CaptureButton';
import ChallengerBox from '@/components/ChallengeBox';
import Feed from '@/components/Feed';
import { TPost } from '@/types';
import React, { useState } from 'react';
const HomeScreen: React.FC = () => {
  const [isCaptureOpen, setIsCaptureOpen] = useState(false)
  const [posts, setPosts] = React.useState<TPost[]>([
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
  ]);

  function addToFeed(post: TPost) {
    setPosts([post, ...posts]);
  }

  return (
    <div className="w-full flex flex-col items-center relative flex-1 mb-32">
      <ChallengerBox />
      {isCaptureOpen ? (
        <Capture
          setIsCaptureOpen={setIsCaptureOpen}
          addToFeed={addToFeed}
        />
      ) : (
        <Feed posts={posts} />
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
