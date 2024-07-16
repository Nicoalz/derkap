'use client';
// import Capture from '@/components/Capture';
import Feed from '@/components/Feed';
import { TPostDb } from '@/types';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getPosts } from '../functions/supabase/post/get-post';
import { signoutSupabase } from '../functions/supabase/signout-supabase';
import { postsMocked } from '../libs/postsData';
interface HomeScreenProps {
  user?: User | null;
}


const HomeScreen: React.FC<HomeScreenProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [allPosts, setAllPosts] = useState<TPostDb[]>(postsMocked as any);


  // const addNewPost = (newPost: TPostDb) => {
  //   setAllPosts([newPost, ...allPosts]);
  // }

  // const handleSignOut = async () => {
  //   const error = await signoutSupabase()
  //   if (error) {
  //     console.error(error)
  //     toast.error('Une erreur est survenue')
  //   }
  // }

  // const handleGetPosts = async () => {
  //   console.log("Getting posts")
  //   const { data, error } = await getPosts(); // { data, error }
  //   // console.log(data, error)
  //   if (error) {
  //     console.error(error)
  //     toast.error('Une erreur est survenue dans la récupération des posts')
  //     return;
  //   }
  //   if (data) {
  //     console.log(data)
  //     setAllPosts(data as any)
  //   }

  // }


  // useEffect(() => {
  //   user && handleGetPosts()
  // }, [user])

  return (
    <div className="w-full flex flex-col items-center relative flex-1 mb-32">
      {user &&
        <>
          {/* <p className='pb-2'>Salut <span className=' text-custom-primary'>{user?.email}</span> !</p> */}
          {/* <button className='mb-2 text-sm px-6 py-2 rounded border-2 border-custom-primary' onClick={handleSignOut}>Se déconnecter</button> */}
        </>
      }
      <Feed />
    </div>
  );
};

export default HomeScreen;
