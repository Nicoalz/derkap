'use server';

import { headers } from 'next/headers';
import { createSupabaseAppServerClient } from '../../libs/supabase/server';

interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
}

export const signupSupabase = async ({
  formValues,
}: {
  formValues: SignUpFormValues;
}) => {
  const origin = headers().get('origin');

  const { email, username, password } = formValues;

  const supabase = createSupabaseAppServerClient();

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          username: username,
        },
      },
    });

    if (error) {
      if (error.message.includes('User already registered')) {
        return 'Cet email est déjà utilisé.';
      }
      if (
        error.message.includes(
          'duplicate key value violates unique constraint "profiles_username_key"',
        )
      ) {
        return "Ce nom d'utilisateur est déjà utilisé.";
      }
      return error.message;
    }
  } catch (error) {
    console.error(error);
  }
};
