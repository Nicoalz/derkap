//DO NOT IMPORT THIS FILE IN THE FRONTEND

import { createClient } from '@supabase/supabase-js';

export const supabaseAdminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ADMIN_KEY!,
);
