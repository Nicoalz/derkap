import { postSubscription } from '@/functions/notification-actions';

const generateSubscription = async () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service workers are not supported by this browser.');
  }

  const registration = await navigator.serviceWorker.ready;
  if (!registration) {
    throw new Error('Service worker registration failed or is not ready.');
  }
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  });
  return subscription.toJSON();
};

const subscribeUser = async () => {
  const subscription = await generateSubscription();
  if (!subscription) return;
  return await postSubscription({ subscription });
};

export const handleAskNotification = async () => {
  const permissionResult = await Notification.requestPermission();
  if (permissionResult === 'granted') {
    return await subscribeUser();
  } else {
    throw new Error('Veuillez autoriser les notifications dans les réglages.');
  }
};
