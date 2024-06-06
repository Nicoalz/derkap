import { UUID } from 'crypto';

import { supabaseAdminClient } from '@/libs/supabaseAdmin';
import webPush from 'web-push';
import { TVapidDetails } from '../types';


export const sendCustomNotificationToAll = async ({
  title,
  message,
}: {
  title: string;
  message: string;
}): Promise<Array<PromiseSettledResult<webPush.SendResult>>> => {
  const vapidDetails = getVapidDetails();

  const subscriptions = await getNotificationSubscriptions();

  const sentNotifs = await Promise.allSettled(
    subscriptions.map(subscription => sendCustomNotification({ subscription, vapidDetails, title, message })),
  );

  return sentNotifs;
};

const getVapidDetails = (): TVapidDetails => {

  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
  const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '';

  if (!vapidPublicKey || !vapidPrivateKey) {
    throw new Error('VAPID keys are not defined');
  }

  return {
    subject: 'mailto: <contact@derkap.com>',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey,
  };
};

const sendCustomNotification = async ({
  subscription,
  vapidDetails,
  title,
  message,
}: {
  subscription: webPush.PushSubscription;
  vapidDetails: TVapidDetails;
  title: string;
  message: string;
}): Promise<webPush.SendResult> => {
  try {
    const payload = JSON.stringify({ title, message });

    const sentNotif = await webPush.sendNotification(subscription, payload, { vapidDetails });

    return sentNotif;
  } catch (error) {
    console.error('Error sending notification', error);
    throw error;
  }
};

export const sendCustomNotificationToUser = async (params: {
  userId: UUID;
  title: string;
  message: string;
}): Promise<webPush.SendResult> => {
  const { userId, title, message } = params;

  const subscriptions = await getNotificationSubscriptions({ ids: [userId] });

  if (subscriptions.length === 0) throw new Error('No subscriptions found for user');

  const subscription = subscriptions[0];

  const vapidDetails = getVapidDetails();

  const sentNotif = await sendCustomNotification({ subscription, vapidDetails, title, message });

  return sentNotif;
};

const getNotificationSubscriptions = async (params?: { ids?: UUID[] }): Promise<webPush.PushSubscription[]> => {

  const { ids } = params || {};
  let request = supabaseAdminClient.from('NotificationSubscription').select('*');

  if (ids && ids.length > 0) request = request.in('userId', ids);

  const { data, error } = await request;

  if (error) throw error;

  const subscriptions = data.map((sub: { subscription: webPush.PushSubscription }) => sub.subscription);

  return subscriptions;
};

export const saveSubscription = async ({
  subscription,
}: {
  subscription: webPush.PushSubscription;
}): Promise<void> => {
  const { error } = await supabaseAdminClient.from('NotificationSubscription').insert([{ subscription }]);
  console.log({
    step:'saveSubscription',
    error
  })
  if (error) throw error;
};

// export const resetSubscription = async ({
//   id,
//   subscription,
// }: {
//   id: UUID;
//   subscription: webPush.PushSubscription;
// }): Promise<void> => {
//   // delete all old subscriptions
//   await deleteUserSubscriptions(id);

//   // save new subscription
//   await saveSubscription({ id, subscription });
// };

// const deleteUserSubscriptions = async (userId: UUID): Promise<void> => {
//   const { error } = await supabaseAdminClient.from('NotificationSubscription').delete().match({ userId });

//   if (error) throw error;
// };
