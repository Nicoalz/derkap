'use server';
import { redirect } from 'next/navigation';
import { createSupabaseAppServerClient } from '../../libs/supabase/server';

export const signoutSupabase = async () => {
  const supabase = createSupabaseAppServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return error.message;
  }

  return redirect('/connexion');
};
