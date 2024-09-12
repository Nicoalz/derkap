'use server';

import { createSupabaseAppServerClient } from '@/libs/supabase/server';

export const getActiveChallenge = async () => {
  const supabase = createSupabaseAppServerClient();

  try {
    const { data, error } = await supabase.from('challenge')
      .select('*')
      .eq('is_active', true)

    if (error) {
      console.error('Supabase error:', error);
      return { data: null, error: error.message };
    }

    if (!data || data.length === 0) {
      return { data: null, error: 'No active challenge found' };
    }

    console.log('Active challenge fetched:', data[0]);

    return { data: data[0], error: null };
  } catch (error) {
    console.error('Fetching active challenge failed:', error);
    return { data: null, error: String(error) };
  }
};
