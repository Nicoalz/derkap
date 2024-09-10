"use client";
import FollowBlock from '@/components/FollowBlock';
import KapsBox from '@/components/KapsBox';
import { useUser } from '@/contexts/user-context';
import { mockedKaps } from '@/libs/mockedKaps';
import { TKaps } from '@/types/Kaps';
import Image from 'next/image';
import { useState } from 'react';
import CategoriesFilter from '../components/CategoriesFilter';
import { mockedCategories } from '../libs/mockedCategories';
import { SettingsIcon } from 'lucide-react';
import { AddCommunity, Loop } from '../components/Icon';
import Link from 'next/link';
import KapsCard from '../components/KapsCard';
import { mockedSponsorised } from '../libs/mockedSponsorised';

const KapsScreen: React.FC = () => {
  const { userData } = useUser();
  const { username, name } = userData;
  const [abonnes, setAbonnes] = useState(123);
  const [abonnements, setAbonnements] = useState(102);
  const [kaps, setKaps] = useState<TKaps[]>(mockedKaps);
  const [sponsorisedKaps, setSponsorisedKaps] = useState(mockedSponsorised);

  return (
    <div className="w-full mb-32 px-2">
      <div className='w-full flex flex-col gap-4'>
        <div className='w-full flex gap-2'>
          <div className='w-full flex items-center bg-white rounded-lg p-2 gap-2'>
            <Loop />
            <input type="text" placeholder="Recherche..." className='w-full' />
          </div>
          <Link href='/kaps' className='flex items-center justify-center p-2 bg-custom-primary text-white rounded-lg'>
            <AddCommunity />
          </Link>
        </div>

        <div className='flex justify-items-center overflow-scroll gap-x-3 no-scrollbar'>
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
        </div>
      </div>
    </div>
  );
};

export default KapsScreen;
