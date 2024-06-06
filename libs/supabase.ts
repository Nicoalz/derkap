import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

export const getAuthToken = async (): Promise<string | undefined> => {
  const supabaseSession = await supabase.auth.getSession();

  if (!supabaseSession) {
    return undefined;
  }

  return supabaseSession.data.session?.access_token;
};
