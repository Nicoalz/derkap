"use client"
import { usePWA } from '@/contexts/pwa-context';
import { fetchWithToken } from '@/libs/fetch';
import { useEffect, useState } from "react";
import { cn } from '../lib/utils';
import { TDerkap } from '../types/Derkap';


interface props extends React.HTMLAttributes<HTMLDivElement> {
  derkap?: TDerkap
}


const ChallengerBox = ({ derkap, className }: props) => {
  const { isPWA } = usePWA();
  const [isNotificationSupported, setIsNotificationSupported] = useState(false);

  useEffect(() => {
    setIsNotificationSupported('Notification' in window);
  }, []);
  const requestPermission = async () => {
    if (!isNotificationSupported || Notification?.permission === 'granted') return;

    const permission = await Notification.requestPermission();
    console.log({
      step: 'permisiondone',
      permission
    })
    if (permission === 'granted') {
      await subscribeUser();
    }
  };

  const subscribeUser = async () => {
    try {
      console.log({
        step: 'registration1',
      });

      if (!('serviceWorker' in navigator)) {
        console.error('Service workers are not supported by this browser.');
        return;
      }

      console.log('Service workers are supported by this browser.');

      // Wait for the service worker to be ready
      const registration = await navigator.serviceWorker.ready;



      if (!registration) {
        console.error('Service worker registration failed or is not ready.');
        return;
      }

      console.log({
        step: 'registration2',
        registration,
      });

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      console.log({
        step: 'registration3',
        subscription,
      });

      await fetchWithToken('/api/notification/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          subscription,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error subscribing to notifications', error);
    }
  };

  const { description, icone, title, subtitle } = derkap ?? {};


  return (
    <div className={cn(' w-full', className)}>
      <div
        onClick={() => {
          requestPermission();
        }}
        className='flex w-full px-4 bg-custom-white border border-custom-black rounded-xl py-2 text-black shadow-card gap-4 items-center'>
        {/* <Image className=' ' src='/visage.svg' width={60} height={60} alt='mrderka' /> */}
        <p className='text-[3rem] '>
          {icone ?? '📭'}
        </p>
        <div className='text-left'>
          <h1 className='font-bold uppercase text-lg font-champ'>{title ?? 'Derkap du jour'}</h1>
          <p className='text-sm font-champ'>
            {subtitle ?? 'Pas de défis pour le moment'}
          </p>
          <p className='text-sm'>
            {description ?? 'Reviens plus tard'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengerBox;
