'use client';

import { useState } from 'react';

interface props extends React.HTMLAttributes<HTMLDivElement> {
  kaps: any;
}

const KapsImage = ({ kaps, className, ...props }: props) => {
  const { name, members, creator, imageUrl, description, isJoin } = kaps;
  const [joined, setJoined] = useState(isJoin);

  const handleButtonClick = () => {
    setJoined(!joined);
  };
  return (
    <div
      className={`relative min-w-full w-full h-96 overflow-visible ${className}`}
      {...props}
    >
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="flex flex-col justify-end h-full p-4 bg-black bg-opacity-60">
          <h2 className="text-white text-2xl font-champ">{name}</h2>
          <p className="text-white text-xs opacity-70">{members} Abonnés</p>
          <p className="text-white text-xs opacity-70">@{creator}</p>
          <p className="text-white text-sm mb-2 opacity-70">{description}</p>
        </div>
      </div>

      <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
        <button
          onClick={handleButtonClick}
          className={`text-white text-sm font-bold py-2 px-14 rounded-md font-champ ${joined ? 'bg-red-600' : 'bg-purple-600'}`}
        >
          {joined ? 'Quitter' : 'Rejoindre'}
        </button>
      </div>
    </div>
  );
};

export default KapsImage;
