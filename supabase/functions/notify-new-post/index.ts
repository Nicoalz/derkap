import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import * as webpush from 'https://jsr.io/@negrel/webpush/0.3.0/mod.ts';

Deno.serve(async req => {
  try {
    console.log('Request received');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { post_id, challenge_id, sender_id } = await req.json();
    console.log(post_id, challenge_id, sender_id);

    // First, fetch the group_id associated with the challenge
    const { data: challenge, error: challengeError } = await supabase
      .from('challenge')
      .select('group_id')
      .eq('id', challenge_id)
      .single();

    if (challengeError) {
      console.error('Error fetching challenge', challengeError);
      throw challengeError;
    }

    // Now fetch group participants excluding the sender
    const { data: groupParticipants, error: participantsError } = await supabase
      .from('group_profile')
      .select('profile_id')
      .eq('group_id', challenge.group_id);
    //.neq('profile_id', sender_id);

    console.log('Group participants', groupParticipants);
    if (participantsError) {
      console.error('Error participants', participantsError);
      throw participantsError;
    }

    // Fetch notification subscriptions for group members
    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from('notification_subscription')
      .select('subscription')
      .in(
        'user_id',
        groupParticipants.map(participant => participant.profile_id),
      );

    console.log('Subscriptions', subscriptions);
    if (subscriptionsError) {
      console.error('Error subscriptions', subscriptionsError);
      throw subscriptionsError;
    }

    const vapidKeysString = Deno.env.get('VAPID_KEYS');
    const exportedVapidKeys = JSON.parse(vapidKeysString ?? '');

    const vapidKeys = await webpush.importVapidKeys(exportedVapidKeys, {
      extractable: false,
    });

    const webPushApp = await webpush.ApplicationServer.new({
      contactInformation: 'mailto:contact@derkap.com',
      vapidKeys,
    });

    // Send push notifications
    const notifications = subscriptions.map(async sub => {
      const pushSubscription = sub.subscription;

      const subscriber = new webpush.PushSubscriber(
        webPushApp,
        pushSubscription,
      );

      await subscriber.pushTextMessage(
        JSON.stringify({
          title: 'Nouveau post dans votre groupe',
          message: 'Viens vite le voir !',
        }),
        {},
      );
    });

    console.log('Notifications', notifications);
    await Promise.all(notifications);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

async function transformVapidKeys(
  publicKeyString: string,
  privateKeyString: string,
): Promise<{ publicKey: JsonWebKey; privateKey: JsonWebKey }> {
  const publicKey = await convertToJsonWebKey(publicKeyString, 'public');
  const privateKey = await convertToJsonWebKey(privateKeyString, 'private');

  return { publicKey, privateKey };
}

async function convertToJsonWebKey(
  keyString: string,
  type: 'public' | 'private',
): Promise<JsonWebKey> {
  const keyBuffer = base64ToUint8Array(keyString);
  const algorithm = { name: 'ECDSA', namedCurve: 'P-256' };
  const extractable = true;
  const keyUsages = (type === 'public' ? ['verify'] : ['sign']) as KeyUsage[];

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    algorithm,
    extractable,
    keyUsages,
  );

  return crypto.subtle.exportKey('jwk', cryptoKey);
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
