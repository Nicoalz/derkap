import { fetchWithToken } from '../../libs/fetch';

export const requestPermission = async (user_id: string) => {
  if (Notification?.permission === 'granted') return;
  const permission = await Notification.requestPermission();
  console.log({
    step: 'permission done',
    permission,
  });
  if (permission === 'granted') {
    await subscribeUser(user_id);
  }
};

const subscribeUser = async (user_id: string) => {
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
        user_id: user_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error subscribing to notifications', error);
  }
};
