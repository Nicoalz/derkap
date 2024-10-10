import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const NoPwaScreen: React.FC = () => {
  const [isUserOnMobile, setIsUserOnMobile] = useState(false);
  const [countDown, setCountDown] = useState(5);

  const isMobileDevice = () => {
    const userAgent = navigator.userAgent;
    const isMobileUserAgent = /Mobi|Android/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;

    return isMobileUserAgent && isSmallScreen;
  };

  useEffect(() => {
    if (isMobileDevice()) {
      setIsUserOnMobile(true);
    } else {
      const interval = setInterval(() => {
        setCountDown(prev => prev - 1);
      }, 1000);

      if (countDown === 0) {
        clearInterval(interval);
        window.location.href = 'https://derkap.fr/';
      }

      return () => clearInterval(interval);
    }
  }, [countDown]);

  return (
    <div className="w-full h-screen flex flex-col gap-8 items-center justify-between text-center px-2 py-4">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-champ text-balance">
          Bienvenue sur Derkap!
        </h1>
        {isUserOnMobile ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-balance">
              Pour utiliser cette application, veuillez l&apos;installer sur
              votre appareil.
            </p>
            <Image
              src="/pwa.webp"
              className="w-fit h-full object-contain rounded-xl"
              alt="Tuto PWA"
              width={200}
              height={200}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-balance">
              Oups! Vous n&apos;êtes pas sur mobile...
            </p>
            <p>
              Vous allez être redirigé dans <span>{countDown}</span> secondes
            </p>
          </div>
        )}
      </div>
      <div className="animate-bounce">
        <ArrowDown size={32} className="text-balance" />
      </div>
    </div>
  );
};

export default NoPwaScreen;
