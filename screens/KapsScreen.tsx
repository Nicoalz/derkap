"use client";
import { useUser } from '@/contexts/user-context';
import { mockedKaps } from '@/libs/mockedKaps';
import { TKaps } from '@/types/Kaps';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useDebounce } from 'use-debounce';
import Button from '../components/Button';
import { AddCommunity, Loop } from '../components/Icon';
import Loader from '../components/Loader';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../components/ui/drawer';
import { Skeleton } from '../components/ui/skeleton';
import { cancelFriendRequest, deleteFriendDB, sendFriendRequest } from '../functions/supabase/post/user/friend-request';
import { getUserByUsername } from '../functions/supabase/post/user/get-user';
import { mockedSponsorised } from '../libs/mockedSponsorised';
import { DBStatusType, TSponsorised, TUserDBWithFriendshipAndFriendStatus } from '../types';

const KapsScreen: React.FC = () => {
  const { userData } = useUser();
  const { username, name } = userData;
  const [abonnes, setAbonnes] = useState(123);
  const [abonnements, setAbonnements] = useState(102);
  const [kaps, setKaps] = useState<TKaps[]>(mockedKaps);
  const [sponsorisedKaps, setSponsorisedKaps] = useState(mockedSponsorised);
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced, setSearchValueDebounced] = useDebounce(searchValue, 500);
  const [usersSearched, setUsersSearched] = useState<TUserDBWithFriendshipAndFriendStatus[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const handleSearch = async () => {
    setIsSearchLoading(true);
    const { data } = await getUserByUsername(searchValueDebounced);
    console.log(data);
    if (!data) {
      setIsSearchLoading(false);
      setUsersSearched([]);
      return;
    }
    setUsersSearched(data);
    setIsSearchLoading(false);
  }

  useEffect(() => {
    if (searchValueDebounced) {
      handleSearch();
    }
  }, [searchValueDebounced]);



  return (
    <div className="w-full mb-32 px-2">
      <div className='w-full flex flex-col gap-4'>
        <div className='w-full flex gap-2'>
          <div className='w-full flex items-center bg-white rounded-lg p-2 gap-2'>
            <Loop />
            <input type="text" placeholder="Recherche..." className='w-full bg-white outline-none' onChange={(e) => setSearchValue(e.target.value)} />
          </div>
          <Link href='/kaps' className='flex items-center justify-center  p-2 bg-custom-primary text-white rounded-lg'>
            <AddCommunity />
          </Link>
        </div>
        {searchValueDebounced ? (
          <>
            {isSearchLoading ?
              <div className='w-full flex justify-center items-center flex-col gap-y-2'>
                <Skeleton className="w-full h-14" />
                <Skeleton className="w-full h-14" />
                <Skeleton className="w-full h-14" />
              </div>
              :
              <div className='flex flex-col gap-4'>
                <h2 className='font-champ text-custom-black text-2xl'>Résultat de la recherche</h2>
                <div className='flex flex-col gap-4'>
                  {usersSearched.map((user, i) => {

                    return (
                      <UserCard key={i} {...user} />
                    )
                  }
                  )}
                </div>
              </div>
            }
          </>
        ) : (
          <KapsDefaultContent sponsorisedKaps={sponsorisedKaps} kaps={kaps} />
        )}


      </div>
    </div>
  );
};

export default KapsScreen;

const UserCard = (user: TUserDBWithFriendshipAndFriendStatus) => {
  const [status, setStatus] = useState(user.friendStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const statusLabel: [DBStatusType, string][] =
    [
      ['accepted', 'Ami'],
      ['declined', 'Demande refusée'],
      ['pending', 'Demande envoyée'],
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
    const { error } = await sendFriendRequest(user.id);
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
    const { error } = await cancelFriendRequest(user.id);
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
    const { error } = await deleteFriendDB(user.id);
    if (error) {
      console.error(error);
      toast.error('Erreur lors de la suppression de l\'ami');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);

  }
  return (
    <>
      <div className='flex items-center gap-2 justify-between'>
        <div className='flex gap-x-2 items-center'>

          <Image src={user.avatar_url ?? "/mrderka.png"} alt='' width={200} height={200} className='w-10 h-10 rounded-full object-cover' />
          <div className='flex flex-col gap-1'>
            <span className='font-champ text-custom-black text-lg'>{user.username}</span>
            <span className='font-champ text-custom-black text-sm'>{user.name}</span>
          </div>
        </div>
        {isLoading ? <Loader /> : <Button text={
          statusLabel.find(([key]) => key === status)?.[1] ?? 'Ajouter'
        } className='bg-custom-primary text-white' onClick={handleClick} />}

      </div>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent >
          <div className='flex h-full items-center justify-center flex-col py-[10vh]'>

            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <div className='flex items-center justify-center gap-x-2'>
              <Button className='w-fit' disabled={isLoading} text={isLoading ? "Chargement" : 'Confirmer'} onClick={handleClick} />
              <DrawerClose>

                <Button disabled={isLoading} text='Annuler' />
              </DrawerClose>
            </div>
          </div>

        </DrawerContent>
      </Drawer>
    </>

  )
}

interface KapsCardProps {
  sponsorisedKaps: TSponsorised[];
  kaps: TKaps[];
}




const KapsDefaultContent = ({ sponsorisedKaps, kaps }: KapsCardProps) => {
  return (
    <>
      <h2 className='font-champ text-custom-black text-2xl'>
        Recherchez des utilisateurs
      </h2>

      {/* DEFAULT CONTENT (COMMENTED COMMUNITY) */}

      {/* <div className='flex justify-items-center overflow-scroll gap-x-3 no-scrollbar'>
        {sponsorisedKaps.map((sponsorisedKap) => (
          <KapsCard
            key={sponsorisedKap.id}
            isOfficial={sponsorisedKap.isOfficial}
            isSponsored={sponsorisedKap.sponsorised}
            name={sponsorisedKap.name}
            category={sponsorisedKap.category}
            author={sponsorisedKap.author}
            imageUrl={sponsorisedKap.imageUrl}
          />
        ))}
      </div>

      <div className='flex flex-col gap-4'>
        <h2 className='font-champ text-custom-black text-2xl'>Catégories</h2>
        <CategoriesFilter categories={mockedCategories} withAdmin={false} />
      </div>

      <div className='flex flex-col gap-4'>
        <h4 className='font-champ text-custom-black text-md'>Kaps</h4>
        <div className='gap-y-2'>
          {kaps.map((kap, i) => (
            <KapsBox key={i} kaps={kap} className='my-4' />
          ))}
        </div>
      </div> */}

    </>
  )
}
