'use client';
// import Capture from '@/components/Capture';
import CaptureButton from '@/components/CaptureButton';
import CaptureHook from '@/components/CaptureHook';
import ChallengerBox from '@/components/ChallengeBox';
import Feed from '@/components/Feed';
import { TPost } from '@/types';
import { User } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { signoutSupabase } from '../functions/supabase/signout-supabase';
import { postsMocked } from '../libs/postsData';

interface HomeScreenProps {
  user?: User | null;
}


const HomeScreen: React.FC<HomeScreenProps> = ({ user }) => {
  const [isCaptureOpen, setIsCaptureOpen] = useState(false)
  const [allPosts, setAllPosts] = useState<TPost[]>(postsMocked);


  const addNewPost = (newPost: TPost) => {
    setAllPosts([newPost, ...allPosts]);
  }

  const handleSignOut = async () => {
    const error = await signoutSupabase()
    if (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }


  }

  return (
    <div className="w-full flex flex-col items-center relative flex-1 mb-32">
      {user &&
        <>
          <p className='pb-2'>Salut <span className=' text-custom-primary'>{user?.email}</span> !</p>
          <button className='mb-2 text-sm px-6 py-2 rounded border-2 border-custom-primary' onClick={handleSignOut}>Se déconnecter</button>
        </>
      }
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
