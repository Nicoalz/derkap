'use server';
import { createSupabaseAppServerClient } from '@/libs/supabase/server';
import { Json } from '@/types/supabase';

export const postSubscription = async ({
  subscription,
}: {
  subscription: PushSubscriptionJSON;
}) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }

  const { data, error } = await supabase
    .from('notification_subscription')
    .upsert(
      {
        user_id: user.id,
        subscription: subscription as unknown as Json,
        url: subscription.endpoint,
      },
      {
        onConflict: 'user_id',
      },
    )
    .select('*');

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data,
    error: null,
  };
};
