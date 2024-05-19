import React from "react";


const ChallengerBox: React.FC = () => {

  const challenge = {
    title: 'Chauve qui peut !',
    description: 'Prends une photo de toi avec un chauve !',
  };


  return (
    <div className='flex flex-col justify-center items-center text-center w-full bg-custom-primary rounded-xl py-2 mb-4'>
      <h1 className='font-bold uppercase text-xl'>Challenge du jour</h1>
      <p className=''>
        {challenge.title}
      </p>
      <p className='text-xs'>
        {challenge.description}
      </p>
    </div>
  );
};

export default ChallengerBox;
