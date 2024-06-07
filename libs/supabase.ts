import { createSupabaseAppServerClient } from './supabase/server';

const supabase = createSupabaseAppServerClient();
export const getAuthToken = async (): Promise<string | undefined> => {
  const supabaseSession = await supabase.auth.getSession();

  if (!supabaseSession) {
    return undefined;
  }

  return supabaseSession.data.session?.access_token;
};
