import { postSubscription } from '@/functions/notification-actions';

const isNotificationSupported = (): boolean => {
  return 'Notification' in window;
};

const askPermission = async () => {
  if (!isNotificationSupported()) {
    console.error('Notifications are not supported by this browser.');
    return;
  }

  //   Notification?.permission === 'granted';

  const permission = await Notification.requestPermission();
  return permission;
};

const generateSubscription = async () => {
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
  return subscription.toJSON();
};

const subscribeUser = async () => {
  const subscription = await generateSubscription();
  if (!subscription) return;
  return await postSubscription({ subscription });
};

export const handleAskNotification = async () => {
  const permission = await askPermission();
  if (permission === 'granted') {
    return await subscribeUser();
  }
};
