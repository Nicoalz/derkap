'use client';

import Image from 'next/image';

interface props extends React.HTMLAttributes<HTMLDivElement> {
  isOfficial?: boolean;
  isSponsored?: boolean;
  name?: string;
  category?: string;
  author?: string;
  imageUrl?: string;
}

const KapsCard = ({
  isOfficial,
  isSponsored,
  name,
  category,
  author,
  imageUrl,
  className,
  ...props
}: props) => {
  return (
    <div
      className={`relative min-w-44 w-44 h-64 rounded-lg ${className}`}
      {...props}
    >
      <div className="absolute w-full h-full bg-black rounded-lg">
        <Image
          src={imageUrl || '/default-image.png'}
          layout="fill"
          objectFit="cover"
          alt=""
          className="w-36 h-64 object-cover opacity-70 rounded-lg"
        />
      </div>

      <div className="absolute w-full h-full flex flex-col justify-between p-2">
        {isSponsored ? (
          <p className="text-black rounded-md text-xs p-1 self-end bg-gray-300 w-fit">
            Sponsorisé
          </p>
        ) : (
          <p></p>
        )}

        <div className="">
          <h2 className="text-white text-xl font-bold">{name}</h2>
          <p className="text-white text-sm">{category}</p>

          <div className="flex items-center gap-1">
            <p className="text-white text-xs opacity-50">{author}</p>
            {isOfficial && (
              <Image
                src="/pastille.png"
                width={20}
                height={20}
                alt=""
                className="w-3 h-3 object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KapsCard;
