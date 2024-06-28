"use client"
import { usePWA } from '@/contexts/pwa-context';
import { fetchWithToken } from '@/libs/fetch';
import Image from 'next/image';
import React, { useEffect, useState } from "react";

const ChallengerBox: React.FC = () => {
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

  const challenge = {
    title: 'Chauve qui peut !',
    description: 'Prends une photo de toi avec un chauve !',
  };


  return (
    <div className='px-4 w-full'>
      <div
        onClick={() => {
          requestPermission();
        }}
        className='flex justify-center w-full bg-custom-white border border-custom-black rounded-xl py-2 text-black shadow-card gap-4 items-center'>
        {/* <Image className=' ' src='/visage.svg' width={60} height={60} alt='mrderka' /> */}
        <p className='text-[3rem]'>
          👨‍🦲
        </p>
        <div className='text-left'>
          <h1 className='font-bold uppercase text-lg text-champ'>Derkap du jour</h1>
          <p className='text-sm text-champ'>
            {challenge.title}
          </p>
          <p className='text-sm'>
            {challenge.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengerBox;
