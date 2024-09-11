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
import { Skeleton } from '../components/ui/skeleton';
import { getUserByUsername } from '../functions/supabase/post/user/get-user';
import { sendFriendRequest } from '../functions/supabase/post/user/send-friend-request';
import { mockedSponsorised } from '../libs/mockedSponsorised';
import { TSponsorised, TUserDb } from '../types';

const KapsScreen: React.FC = () => {
  const { userData } = useUser();
  const { username, name } = userData;
  const [abonnes, setAbonnes] = useState(123);
  const [abonnements, setAbonnements] = useState(102);
  const [kaps, setKaps] = useState<TKaps[]>(mockedKaps);
  const [sponsorisedKaps, setSponsorisedKaps] = useState(mockedSponsorised);
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced, setSearchValueDebounced] = useDebounce(searchValue, 500);
  const [usersSearched, setUsersSearched] = useState<TUserDb[]>([]);
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

const UserCard = (user: TUserDb) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const { error } = await sendFriendRequest(user.id);
    if (error) {
      console.error(error);
      toast.error('Erreur lors de l\'envoi de la demande');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsFollowing(!isFollowing);

  }
  return (
    <div className='flex items-center gap-2 justify-between'>
      <div className='flex gap-x-2 items-center'>

        <Image src={user.avatar_url ?? "/mrderka.png"} alt='' width={200} height={200} className='w-10 h-10 rounded-full object-cover' />
        <div className='flex flex-col gap-1'>
          <span className='font-champ text-custom-black text-lg'>{user.username}</span>
          <span className='font-champ text-custom-black text-sm'>{user.name}</span>
        </div>
      </div>
      {isLoading ? <Loader /> : <Button text={isFollowing ? 'Supprimer' : 'Ajouter'} className='bg-custom-primary text-white' onClick={handleClick} />}

    </div>
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
