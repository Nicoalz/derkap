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

    // Fetch group details, participants, and their notification subscriptions in one query
    const { data: groupData, error: groupError } = await supabase
      .from('group')
      .select(
        `
        name,
        group_profile:group_profile!inner(
          profile:profile!inner(
            notification_subscription(subscription)
          )
        )
      `,
      )
      .eq('id', group_id)
      .single();

    if (groupError) {
      console.error('Error fetching group data:', groupError);
      throw groupError;
    }

    const groupName = groupData.name;
    const subscriptions = (groupData.group_profile as any)
      .flatMap(
        (gp: { profile: { notification_subscription: any } }) =>
          gp.profile.notification_subscription,
      )
      .filter(
        (sub: { subscription: null } | null) =>
          sub !== null && sub.subscription !== null,
      );

    console.log('Old status :', old_status);
    console.log('New status :', new_status);
    console.log('Group name:', groupName);
    console.log('Subscriptions:', subscriptions);

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
      title = `${groupName}: Nouveau challenge !`;
      message = `Un nouveau challenge a été créé dans ton groupe ${groupName}. Viens le découvrir ! 🤯`;
    } else if (event_type === 'status_change') {
      if (new_status === 'voting') {
        title = `${groupName}: Challenge ✅`;
        message = `Tout le monde a posté ! Maintenant, faut voter ! 🤪 `;
      } else if (new_status === 'ended') {
        title = `${groupName}: Stooooop !`;
        message = `Les votes sont clos ! Qui a gagné ? 🧐 `;
      } else {
        message = `Le challenge est passé de "${old_status}" à "${new_status}".`;
      }
    }

    // Send push notifications
    const notifications = subscriptions.map(
      async (sub: { subscription: any }) => {
        const pushSubscription = sub.subscription;

        const subscriber = new webpush.PushSubscriber(
          webPushApp,
          pushSubscription,
        );

        await subscriber.pushTextMessage(
          JSON.stringify({ title, message }),
          {},
        );
      },
    );

    await Promise.allSettled(notifications);
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
