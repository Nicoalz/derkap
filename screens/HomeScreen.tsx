'use client';
// import Capture from '@/components/Capture';
import FeedSwipe from '@/components/FeedSwipe';
import { TPostDb } from '@/types';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getPosts } from '../functions/supabase/post/get-post';
import { signoutSupabase } from '../functions/supabase/signout-supabase';

interface HomeScreenProps {
  user?: User | null;
}


const HomeScreen: React.FC<HomeScreenProps> = ({ user }) => {

  return (
    <div className="w-full flex flex-col items-center relative flex-1 mb-32 no-scrollbar">
      <FeedSwipe />
    </div>
  );
};

export default HomeScreen;
