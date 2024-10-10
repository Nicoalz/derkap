import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

const NoPwaScreen: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-8 items-center justify-between text-center px-2 py-4">
      <h1 className="text-3xl font-champ text-balance">
        Bienvenue sur Derkap!
      </h1>
      <div className="flex flex-col items-center gap-4">
        <p className="text-balance">
          Pour utiliser cette application, veuillez l&apos;installer sur votre
          appareil.
        </p>
        <Image
          src="/pwa.webp"
          className="w-fit h-96  object-contain rounded-xl"
          alt="Tuto PWA"
          width={200}
          height={200}
        />
      </div>
      <div className="animate-bounce">
        <ArrowDown size={32} className="text-balance" />
      </div>
    </div>
  );
};

export default NoPwaScreen;
