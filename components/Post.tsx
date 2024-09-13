

import { TPostDb, postHeight, postWitdh } from '@/types';
import Image from 'next/image';
import React, { useState } from "react";
import { toast } from 'sonner';
import { useUser } from '../contexts/user-context';
import { deletePost } from '../functions/supabase/post/delete-post';
import PostImage from './PostImage';

import 'swiper/css';
import 'swiper/css/effect-cards';

const Post: React.FC<{ postData: TPostDb }> = ({ postData }) => {

  const { userData } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDeletePost = async () => {
    setIsLoading(true)
    try {
      const { error } = await deletePost({ post: postData })
      if (error) {
        console.error(error)
        toast.error('Impossible de supprimer le post')
        return;
      }
      else {
        toast.success('Post supprimé')
        setIsDrawerOpen(false)


      }
    } catch (error) {
      console.error(error)
    }
    finally {
      setIsLoading(false)
    }
  }


  return (


    <div className='flex flex-col w-full swiper-slide no-scrollbar rounded-xl h-fit text-custom-black'>
      <div className='w-full justify-between flex py-2 px-4 items-center'>
        <div className='flex justify-center items-center gap-4'>
          <Image
            alt={postData.user?.name ?? ""}
            src={postData.user?.avatar_url ?? "/mrderka.png"}
            width={30}
            height={30}
            className='rounded-lg w-8 h-8 object-cover'
          />
          <div className='flex flex-col'>
            <p className='text-champ text-xs text-custom-black'>{postData.user?.name ?? postData.user.username}</p>
            {/* <p className='text-dmsans text-sm'>Location</p> */}

          </div>
        </div>

      </div>
      {postData.is_photo ? (
        <PostImage
          alt={postData.description ?? ""}
          src={postData.file_url ?? ""}
          username={postData.user.username}
          description={postData.description}
          id={postData.id}
          reactions={postData.reactions}
        />
      ) : (
        <video width={postWitdh} height={postHeight} src={postData.file_url ?? ""} controls />
      )}
    </div>
  );
};

export default Post;
