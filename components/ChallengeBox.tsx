'use client'
import { useEffect, useState } from "react";
import { getActiveChallenge } from '../functions/supabase/post/challenge/get-challenge';
import { cn } from '../lib/utils';
import { Skeleton } from './ui/skeleton'; // Assurez-vous d'importer le composant Skeleton

interface props extends React.HTMLAttributes<HTMLDivElement> { }

const ChallengerBox = ({ className, ...props }: props) => {
  const [challenge, setChallenge] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotificationSupported, setIsNotificationSupported] = useState(false);

  const fetchActiveChallenge = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await getActiveChallenge();
      if (error) {
        console.error('Error fetching challenge:', error);
        return;
      }
      console.log('Active challenge:', data);
      setChallenge(data);
    } catch (err) {
      console.error('Error fetching challenge:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsNotificationSupported('Notification' in window);
    fetchActiveChallenge();
  }, []);

  const requestPermission = async () => {
    if (!isNotificationSupported || Notification?.permission === 'granted') return;

    const permission = await Notification.requestPermission();
    console.log({
      step: 'permission done',
      permission
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

  const { description, emoji, title, category } = challenge ?? {};

  return (
    <div {...props} className={cn('w-full', className)}>
      {isLoading ? (
        <Skeleton className="w-full h-20" />
      ) : (
        <div
          onClick={() => {
            requestPermission();
          }}
          className='flex w-full px-4 bg-custom-white border border-custom-black rounded-xl py-2 text-custom-black shadow-card gap-4 items-center'>
          <p className='text-[3rem] '>
            {emoji ?? '📭'}
          </p>
          <div className='text-left'>
            <h1 className='font-bold uppercase text-lg font-champ'>{title ?? 'Derkap du jour'}</h1>
            <p className='text-sm font-champ text-custom-black'>
              {category ?? 'Pas de défis pour le moment'}
            </p>
            <p className='text-sm'>
              {description ?? 'Reviens plus tard'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengerBox;
