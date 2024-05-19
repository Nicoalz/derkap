'use client';
import Capture from '@/components/Capture';
import CaptureButton from '@/components/CaptureButton';
import ChallengerBox from '@/components/ChallengeBox';
import Feed from '@/components/Feed';
import React, { useState } from 'react';
const HomeScreen: React.FC = () => {
  const [isCaptureOpen, setIsCaptureOpen] = useState(false)
  return (
    <div className="w-full flex flex-col items-center relative flex-1 mb-32">
      <ChallengerBox />
      {isCaptureOpen ? (
        <Capture
          setIsCaptureOpen={setIsCaptureOpen}
        />
      ) : (
        <Feed />
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
