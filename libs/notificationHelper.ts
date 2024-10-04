import { postSubscription } from '@/functions/notification-actions';

const isNotificationSupported = (): boolean => {
  return 'Notification' in window;
};

const askPermission = async () => {
  //   Notification?.permission === 'granted';

  const permission = await Notification.requestPermission();
  return permission;
};

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

const getCurrentSubscription = async () => {
  const registration = await navigator.serviceWorker.ready;
  if (!registration) {
    throw new Error('Service worker registration failed or is not ready.');
    return;
  }

  return await registration.pushManager.getSubscription();
};

export const handleAskNotification = async () => {
  if (!isNotificationSupported()) {
    throw new Error('Notifications are not supported by this browser.');
  }
  const permission = await askPermission();
  const currentSubscription = await getCurrentSubscription();
  if (currentSubscription) {
    await currentSubscription.unsubscribe();
  }
  if (permission === 'granted') {
    return await subscribeUser();
  }
};
