
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
import AspectRatioImage from './AspectRatioImage';
import { cn } from '../lib/utils';
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
    <div className='flex flex-col w-full py-4'>
      <div className='w-full justify-between flex px-2 py-2 items-center'>
        <div className='flex justify-center items-center'>
          <Image
            alt={postData.user?.name ?? ""}
            src={postData.user?.avatar_url ?? "/mrderka.png"}
            width={30}
            height={30}
            className='rounded-full mr-2 w-8 h-8 object-cover'
          />
          <p>{postData.user?.name ?? postData.user.username}</p>
        </div>

        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisHorizontalIcon className='w-5 h-5' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <DropdownMenuLabel>Signaler</DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenuLabel>Partager</DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DropdownMenuLabel>Enregistrer</DropdownMenuLabel>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <Drawer open={isDrawerOpen}>
          <DrawerTrigger>
            <EllipsisHorizontalIcon className='w-5 h-5' onClick={() => setIsDrawerOpen(true)} />
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
          username={postData.user?.username ?? ""}
          description={postData.description ?? ""}
        />
      ) : (
        <video width={postWitdh} height={postHeight} src={postData.file_url ?? ""} controls />
      )}
    </div>
  );
};

export default Post;
