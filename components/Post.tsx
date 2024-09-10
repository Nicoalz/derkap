
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTrigger
} from "@/components/ui/drawer";
import { TPostDb, postHeight, postWitdh } from '@/types';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from "react";
import { toast } from 'sonner';
import { useUser } from '../contexts/user-context';
import { deletePost } from '../functions/supabase/post/delete-post';
import { cn } from '../lib/utils';
import AspectRatioImage from './AspectRatioImage';


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
    <div className='flex flex-col w-full bg-custom-white rounded-lg'>
      <div className='w-full justify-between flex p-4 items-center '>
        <div className='flex justify-center items-center gap-4'>
          <Image
            alt={postData.user?.name ?? ""}
            src={postData.user?.avatar_url ?? "/mrderka.png"}
            width={30}
            height={30}
            className='rounded-lg w-8 h-8 object-cover'
          />
          <div className='flex flex-col'>
            <p className='text-champ'>{postData.user?.name ?? postData.user.username}</p>
            {/* <p className='text-dmsans text-sm'>Location</p> */}

          </div>
        </div>
        <Drawer >
          <DrawerTrigger>
            <EllipsisHorizontalIcon className='w-8 h-8' onClick={() => setIsDrawerOpen(true)} />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerDescription>
              <div className='w-full flex items-center justify-center gap-4 p-8 mb-16'>
                <button type='button' disabled={isLoading}>Signaler</button>
                <button type='button' disabled={isLoading}>Partager</button>
                <button type='button' disabled={isLoading}>Enregistrer</button>
                {userData.id == postData.user.id && <button type='button' className={cn({ "text-opacity-80": isLoading })} onClick={handleDeletePost} disabled={isLoading}>{isLoading ? "Suppression..." : "Supprimer"}</button>}
              </div>
            </DrawerDescription>
          </DrawerContent>
        </Drawer>
      </div>

      {postData.is_photo ? (
        <AspectRatioImage
          alt={postData.description ?? ""}
          src={postData.file_url ?? ""}
        />
      ) : (
        <video width={postWitdh} height={postHeight} src={postData.file_url ?? ""} controls />
      )}

      {postData.description && (
        <div className='p-4'>
          <p><span className='font-bold mr-2'>{postData.user.username}</span>{postData.description}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
