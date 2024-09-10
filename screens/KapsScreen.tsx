"use client";
import { useUser } from '@/contexts/user-context';
import { mockedKaps } from '@/libs/mockedKaps';
import { TKaps } from '@/types/Kaps';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { AddCommunity, Loop } from '../components/Icon';
import { Skeleton } from '../components/ui/skeleton';
import { getUserByUsername } from '../functions/supabase/post/user/get-user';
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
                  {usersSearched.map((user, i) => (
                    <div key={i} className='flex items-center gap-2'>
                      <img src={user.avatar_url ?? "/mrderka.png"} className='w-10 h-10 rounded-full' />
                      <div className='flex flex-col gap-1'>
                        <span className='font-champ text-custom-black text-lg'>{user.username}</span>
                        <span className='font-champ text-custom-black text-sm'>{user.name}</span>
                      </div>
                    </div>
                  ))}
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
