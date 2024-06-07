import { createBrowserClient } from "@supabase/ssr";

export const createSupabaseFrontendClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,

  );
