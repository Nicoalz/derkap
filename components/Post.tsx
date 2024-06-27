import { TPost, postHeight, postWitdh } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from "react";
import AspectRatioImage from './AspectRatioImage';





const Post: React.FC<{ postData: TPost }> = ({ postData }) => {

  return (
    <div className='flex flex-col w-full py-4'>
      <div className='w-full justify-between flex px-2 py-2 items-center'>
        <div className='flex justify-center items-center'>
          <Image
            alt={postData.user.name}
            src={postData.user.img}
            width={30}
            height={30}
            className='rounded-full mr-2 w-8 h-8 object-cover'
          />
          <p>{postData.user.name}</p>
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
        <Drawer >
          <DrawerTrigger>
            <EllipsisHorizontalIcon className='w-5 h-5' />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerDescription>
              <div className='w-full flex items-center justify-center gap-4 p-8 mb-16'>
                <p>Signaler</p>
                <p>Partager</p>
                <p>Enregistrer</p>
              </div>
            </DrawerDescription>
          </DrawerContent>
        </Drawer>
      </div>
      {postData.isPhoto ? (
        <AspectRatioImage
          alt={postData.description}
          src={postData.url}
          username={postData.user.username}
          description={postData.description}
        />
      ) : (
        <video width={postWitdh} height={postHeight} src={postData.url} controls />
      )}
    </div>
  );
};

export default Post;
