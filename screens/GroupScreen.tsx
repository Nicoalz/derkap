'use client';

import React from "react";
import Header from "@/components/Header";
import { cn } from '../lib/utils';

const GroupScreen = ({ id }: { id: string }) => {

  const imgObj: { [key: string]: { src: string; id: string, name: string } } = {
    img1: {
      src: 'https://picsum.photos/100',
      id: '1',
      name: 'img2zdzdzdqzlkfghseiufgh',
    },
    img2: {
      src: 'https://picsum.photos/200',
      id: '2',
      name: 'img2zdzdzdqzlkfghseiufgh',
    },
    img3: {
      src: 'https://picsum.photos/300',
      id: '3',
      name: 'img3',
    },
  };
  const challengeStatus: 'posting' | 'voting' | 'ended' = 'posting';

  const status = () => {
    if (challengeStatus === 'posting') {
      return 'En cours';
    } else if (challengeStatus === 'voting') {
      return 'À voter';
    } else if (challengeStatus === 'ended') {
      return 'Terminé';
    }
  }

  return (
    <div>
      <Header title='Groupe Name'>
        <p className={cn('text-white py-1 px-2 rounded-xl text-sm', challengeStatus === 'posting' && 'bg-orange-500', challengeStatus === 'voting' && "bg-yellow-400", challengeStatus === "ended" && "bg-gray-500" )}>{status()}</p>
      </Header>

      <div className='w-full flex items-center justify-center'>
        {Object.keys(imgObj).map((key, index) => (
          <div className='flex flex-col items-center '>
            <img
              key={imgObj[key].id}
              src={imgObj[key].src}
              className={`min-w-10 min-h-10 max-h-10 max-w-10 rounded-full ${index !== 0 && '-ml-2'}`}
            />
            <p className='text-[10px] text-wrap overflow-hidden text-ellipsis max-w-8'>{imgObj[key].name}</p>
          </div>
        ))}
      </div>



    </div>
  );
}


export default GroupScreen;
