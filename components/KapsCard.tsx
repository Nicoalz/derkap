"use client"

import Image from 'next/image';
import { TKaps } from '../types';

interface props extends React.HTMLAttributes<HTMLDivElement> {
  kaps?: TKaps
  isOfficielle?: boolean
  isSponsored?: boolean
}

const KapsCard = ({ isOfficielle, isSponsored, className, ...props }: props) => {
  return (
    <div className='relative min-w-36 w-36 h-64 rounded-lg'>
      <div className='absolute w-full h-full bg-black rounded-lg'>
        <Image src='/mrderka.png' layout='fill' objectFit='cover' alt='' className='w-36 h-64 object-cover opacity-70' />
      </div>

      <div className='absolute w-full h-full flex flex-col justify-between p-2'>
        {
          isSponsored ? (
              <p className='text-black rounded-md text-xs p-1 self-end bg-gray-300 w-fit'>Sponsorisé</p>
          ) : <p></p>
        }

        <div>
          <h2 className='text-white text-xl font-bold'>Titre</h2>
          <p className='text-white text-sm'>Catégories</p>

          <div className='flex items-center gap-1'>
            <p className='text-white text-xs'>Auteur</p>
            {
              isOfficielle && (
                <Image src='/pastille.png' width={20} height={20} alt='' className='w-3 h-3 object-cover' />
              )
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default KapsCard;

// position: absolute;
// top: 50 %;
// left: 50 %;
// transform: translate(-50 %, -50 %);
