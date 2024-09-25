'use client';
import { useEffect, useState } from 'react';
import { fetchWithToken } from '../libs/fetch';
import { cn } from '../libs/utils';
import { TChallengeDB } from '@/types/types';

interface ChallengeBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  challenge: TChallengeDB;
}

const ChallengeBox = ({
  challenge,
  className,
  ...props
}: ChallengeBoxProps) => {
  const [isLoading] = useState(false);
  const [isNotificationSupported, setIsNotificationSupported] = useState(false);

  useEffect(() => {
    setIsNotificationSupported('Notification' in window);
  }, []);

  const requestPermission = async () => {
    if (!isNotificationSupported || Notification?.permission === 'granted')
      return;

    const permission = await Notification.requestPermission();
    console.log({
      step: 'permission done',
      permission,
    });
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

      const registration = await navigator.serviceWorker.ready;

      if (!registration) {
        console.error('Service worker registration failed or is not ready.');
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
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

  return (
    <div {...props} className={cn('w-full', className)}>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div
          onClick={() => {
            requestPermission();
          }}
          className="h-24 flex w-full px-4 bg-custom-white border border-custom-black rounded-xl py-2 text-custom-black shadow-element gap-4 items-center"
        >
          <p className="text-[3rem] ">{challenge ? '😹' : '😢'}</p>
          <div className="text-left">
            {/* <h1 className="font-bold uppercase text-lg font-champ">
              {'Derkap du jour'}
            </h1> */}
            <p className="text-sm font-champ text-custom-black">
              {challenge ? challenge.description : 'Reviens plus tard'}
            </p>
            <p className="text-sm">
              {challenge
                ? 'Créé par ' + challenge.creator?.username
                : 'Reviens plus tard'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeBox;
