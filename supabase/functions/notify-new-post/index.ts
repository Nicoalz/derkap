import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import * as webpush from 'https://jsr.io/@negrel/webpush/0.3.0/mod.ts';

// Define types for our data structure
type Challenge = {
  group_id: number;
  group: {
    name: string;
  };
};

type Sender = {
  username: string;
};

type Subscription = {
  subscription: webpush.PushSubscription;
};

Deno.serve(async (req: Request) => {
  try {
    console.log('Request received');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { post_id, challenge_id, sender_id } = await req.json();
    console.log(post_id, challenge_id, sender_id);

    // Fetch challenge details including group_id and group name
    const { data: challengeData, error: challengeError } = await supabase
      .from('challenge')
      .select(
        `
        group_id,
        group:group_id (
          name
        )
      `,
      )
      .eq('id', challenge_id)
      .single();

    if (challengeError) {
      console.error('Error fetching challenge', challengeError);
      throw challengeError;
    }

    const challenge = challengeData as unknown as Challenge;
    console.log('Challenge', challenge);

    // Fetch sender's username
    const { data: senderData, error: senderError } = await supabase
      .from('profile')
      .select('username')
      .eq('id', sender_id)
      .single();

    if (senderError) {
      console.error('Error fetching sender', senderError);
      throw senderError;
    }

    const sender = senderData as Sender;

    console.log('Sender', sender);

    // Fetch group participants excluding the sender
    const { data: groupParticipants, error: participantsError } = await supabase
      .from('group_profile')
      .select('profile_id')
      .eq('group_id', challenge.group_id)
      .neq('profile_id', sender_id);

    console.log('Group participants', groupParticipants);
    if (participantsError) {
      console.error('Error participants', participantsError);
      throw participantsError;
    }

    // Fetch notification subscriptions for group members
    const { data: subscriptionsData, error: subscriptionsError } =
      await supabase
        .from('notification_subscription')
        .select('subscription')
        .in(
          'user_id',
          groupParticipants.map(participant => participant.profile_id),
        );

    if (subscriptionsError) {
      console.error('Error subscriptions', subscriptionsError);
      throw subscriptionsError;
    }

    const subscriptions = subscriptionsData as Subscription[];

    console.log('Subscriptions', subscriptions);

    const vapidKeysString = Deno.env.get('VAPID_KEYS');
    if (!vapidKeysString) {
      throw new Error('VAPID_KEYS not found in environment variables');
    }
    const exportedVapidKeys = JSON.parse(vapidKeysString);

    const vapidKeys = await webpush.importVapidKeys(exportedVapidKeys, {
      extractable: false,
    });

    const webPushApp = await webpush.ApplicationServer.new({
      contactInformation: 'mailto:contact@derkap.com',
      vapidKeys,
    });

    // Prepare notification message
    const title = `${challenge.group.name}: Nouveau post !`;
    const message = `${sender.username} a pris son Derkap ! 🤪`;

    // Send push notifications
    const notifications = subscriptions.map(async sub => {
      const pushSubscription = sub.subscription;

      const subscriber = new webpush.PushSubscriber(
        webPushApp,
        pushSubscription,
      );

      await subscriber.pushTextMessage(JSON.stringify({ title, message }), {});
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
