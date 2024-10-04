import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import * as webpush from 'https://jsr.io/@negrel/webpush/0.3.0/mod.ts';

Deno.serve(async req => {
  try {
    console.log('Request received');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { challenge_id, group_id, event_type, old_status, new_status } =
      await req.json();
    console.log('Received data:', {
      challenge_id,
      group_id,
      event_type,
      old_status,
      new_status,
    });

    // Fetch group participants
    const { data: groupParticipants, error: participantsError } = await supabase
      .from('group_profile')
      .select('profile_id')
      .eq('group_id', group_id);

    if (participantsError) {
      console.error('Error fetching participants:', participantsError);
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

    if (subscriptionsError) {
      console.error('Error fetching subscriptions:', subscriptionsError);
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

    // Prepare notification message
    let title = '';
    let message = '';
    if (event_type === 'new_challenge') {
      title = 'Nouveau challenge dans votre groupe';
      message = 'Un nouveau challenge a été créé. Venez le découvrir !';
    } else if (event_type === 'status_change') {
      title = 'Mise à jour du statut du challenge';
      message = `Le statut du challenge est passé de "${old_status}" à "${new_status}".`;
    }

    // Send push notifications
    const notifications = subscriptions.map(async sub => {
      const pushSubscription = sub.subscription;

      const subscriber = new webpush.PushSubscriber(
        webPushApp,
        pushSubscription,
      );

      await subscriber.pushTextMessage(JSON.stringify({ title, message }), {});
    });

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
