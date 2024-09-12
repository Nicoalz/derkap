"use client";

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { cancelFriendRequest, deleteFriendDB, sendFriendRequest } from '../functions/supabase/post/user/friend-request';
import { cn } from '../libs/utils';
import { DBStatusType } from '../types';
import Button from './Button';
import Loader from './Loader';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from './ui/drawer';

export const UserCard = ({ friendStatus, user_id, username, name, avatar_url, isOnProfile }: {
  friendStatus: DBStatusType,
  user_id: string,
  username: string,
  name: string,
  avatar_url: string,
  isOnProfile?: boolean
}) => {
  const [status, setStatus] = useState(friendStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // DELETED FRIEND ON FRONTEND (IMMEDIALTY)
  const [isDeletedIdOnDb, setIsDeletedIdOnDb] = useState<string>();

  const statusLabel: [DBStatusType, string][] =
    [
      ['accepted', 'Supprimer'],
      ['declined', 'Demande refusée'],
      ['pending', 'En attente'],
      [null, 'Ajouter']
    ];

  const handleClick = async () => {
    if (status === 'accepted') {
      if (!openDrawer) {
        setOpenDrawer(true);
        return;
      }
      await deleteFriend();
      setStatus(null);
      setOpenDrawer(false);
      return;

    }
    if (status === 'pending') {
      if (!openDrawer) {
        setOpenDrawer(true);
        return;
      }
      await cancelDemand();
      setStatus(null);
      setOpenDrawer(false);

      return;
    }
    await addFriend();
  }


  const addFriend = async () => {
    setIsLoading(true);
    const { error } = await sendFriendRequest(user_id);
    if (error) {
      console.error(error);
      toast.error('Erreur lors de l\'envoi de la demande');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setStatus('pending');

  }

  const cancelDemand = async () => {
    setIsLoading(true);
    const { error } = await cancelFriendRequest(user_id);
    if (error) {
      console.error(error);
      toast.error('Erreur lors de l\'annulation de la demande');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);

  }

  const deleteFriend = async () => {
    setIsLoading(true);
    const { error } = await deleteFriendDB(user_id);
    if (error) {
      console.error(error);
      toast.error('Erreur lors de la suppression de l\'ami');
      setIsLoading(false);
      return;
    }
    // HIDE PREVIOUS FRIEND WHICH IS DELETED
    isOnProfile && setIsDeletedIdOnDb(user_id);
    setIsLoading(false);

  }
  return (
    console.log('user_id', friendStatus),
    <div className={
      cn('w-full h-full', {
        'hidden': isDeletedIdOnDb == user_id
      })}>
      <div className='flex items-center gap-2 justify-between'>
        <div className='flex gap-x-2 items-center'>

          <Image src={avatar_url ?? "/mrderka.png"} alt='' width={200} height={200} className='w-10 h-10 rounded-full object-cover' />
          <div className='flex flex-col gap-1'>
            <span className='font-champ text-custom-black text-lg'>{username}</span>
            <span className='font-champ text-custom-black text-sm text-left'>{name}</span>
          </div>
        </div>
        {isLoading ? <Loader /> : <Button text={
          statusLabel.find(([key]) => key === status)?.[1] ?? 'Ajouter'
        } className={cn('bg-custom-primary text-white', {
          'bg-red-500': status === 'accepted',
          ' bg-gray-400': status === 'pending',
          'hover:bg-custom-green': status === 'declined'
        })} onClick={handleClick} />}

      </div>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent >
          <div className='flex h-full items-center justify-center flex-col py-[10vh]'>

            <DrawerHeader>
              <DrawerTitle>Êtes-vous sûr de vouloir supprimer votre amis ?</DrawerTitle>
              <DrawerDescription>
                Vous ne pourrez plus voir les kaps de cette personne
              </DrawerDescription>
            </DrawerHeader>
            <div className='flex items-center justify-center gap-x-2'>
              <Button className='w-fit bg-red-500' disabled={isLoading} text={isLoading ? "Chargement" : 'Supprimer'} onClick={handleClick} />
              <DrawerClose>
                <Button disabled={isLoading} text='Annuler' />
              </DrawerClose>
            </div>
          </div>

        </DrawerContent>
      </Drawer>
    </div >

  )
}
