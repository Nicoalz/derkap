import { createBrowserClient } from '@supabase/ssr/dist/main/createBrowserClient';
import { Database } from '../../types/supabase';

export const createSupabaseFrontendClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,

  );
