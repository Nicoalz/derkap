import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const NoPwaScreen: React.FC = () => {
  const [isUserOnMobile, setIsUserOnMobile] = useState(true);
  const [countDown, setCountDown] = useState(5);

  const isMobileDevice = () => {
    const userAgent = navigator.userAgent;
    const isMobileUserAgent = /Mobi|Android/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;

    return isMobileUserAgent && isSmallScreen;
  };

  useEffect(() => {
    if (isMobileDevice()) {
      // setIsUserOnMobile(true);
    } else {
      // const interval = setInterval(() => {
      //   setCountDown(prev => prev - 1);
      // }, 1000);

      // if (countDown === 0) {
      //   clearInterval(interval);
      //   window.location.href = 'https://derkap.fr/';
      // }

      // return () => clearInterval(interval);
    }
  }, [countDown]);

  return (
    <div className="w-full max-h-screen h-screen flex flex-col gap-8 items-center justify-between text-center px-2 py-4">
      <div className="flex flex-col gap-8 h-full">
        <h1 className="text-3xl font-champ text-balance">
          Bienvenue sur Derkap!
        </h1>
        {isUserOnMobile ? (
          <div className="h-full flex flex-col items-center gap-4">
            <p className="flex flex-wrap items-center gap-1 justify-center">
              Pour utiliser cette application, <span className='font-bold'> appuyé sur</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16">
                <path fill="currentColor" d="M3 6.81v6.38c0 .493.448.9.992.9h7.016c.543 0 .992-.406.992-.9V6.81c0-.493-.448-.9-.992-.9H3.992c-.543 0-.992.406-.992.9M6 5v.91h3V5h2.008C12.108 5 13 5.818 13 6.81v6.38c0 1-.9 1.81-1.992 1.81H3.992C2.892 15 2 14.182 2 13.19V6.81C2 5.81 2.9 5 3.992 5zm1.997-3.552A.506.506 0 0 1 8 1.5v8a.5.5 0 0 1-1 0v-8a.51.51 0 0 1 0-.017L5.18 3.394a.52.52 0 0 1-.77 0a.617.617 0 0 1 0-.829L6.36.515a1.552 1.552 0 0 1 2.31 0l1.95 2.05a.617.617 0 0 1 0 .83a.52.52 0 0 1-.77 0z" />
              </svg>
              pour ajouter cette application à votre écran d&apos;accueil
            </p>
            <Image
              src="/pwa.webp"
              className="w-fit h-max object-contain rounded-xl"
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
        <ArrowDown size={32} />
      </div>
    </div>
  );
};

export default NoPwaScreen;
