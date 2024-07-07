"use client"
import Image from 'next/image';
import { cn } from '../lib/utils';
import { TKaps } from '../types/Kaps';

interface props extends React.HTMLAttributes<HTMLDivElement> {
  kaps: TKaps
}

const KapsBox = ({ kaps, className, ...props }: props) => {
  const { members, name, creator, isAdmin, imageUrl } = kaps ?? {};
  return (
    <div {...props} className={cn(' w-full', className)}>
      <div
        className='flex w-full px-4 bg-custom-white border border-custom-black rounded-xl py-2 text-custom-black shadow-card gap-3 items-center'>
        <Image className='object-cover w-16 h-16 rounded-lg' src={imageUrl} width={60} height={60} alt={name} />
        <div className='text-left'>
          <h1 className='font-bold text-md font-champ'>{name}</h1>
          <p className={`text-xs my-1 ${isAdmin ? "text-orange-500" : "text-custom-primary"}`}>
            {isAdmin ? 'Vous êtes Admin' : `@${creator}`}
          </p>
          <p className='text-sm'>
            {members} membres
          </p>
        </div>
      </div>
    </div>
  );
};

export default KapsBox;
