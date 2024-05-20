import Image from 'next/image';
import React from "react";

const ChallengerBox: React.FC = () => {

  const challenge = {
    title: 'Chauve qui peut !',
    description: 'Prends une photo de toi avec un chauve !',
  };


  return (
    <div className='flex justify-evenly items-center text-center w-full bg-custom-primary rounded-xl py-2 mb-4'>
      <Image className=' ' src='/mrderka.png' width={60} height={60} alt='mrderka' />
      <div className='text-center'>
        <h1 className='font-bold uppercase text-xl'>Challenge du jour</h1>
        <p className=''>
          {challenge.title}
        </p>
        <p className='text-xs'>
          {challenge.description}
        </p>
      </div>
    </div>
  );
};

export default ChallengerBox;
