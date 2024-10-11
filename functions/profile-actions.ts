'use server';

import { createSupabaseAppServerClient } from '@/libs/supabase/server';

export const getProfile = async ({ user_id }: { user_id?: string }) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', user_id ?? user.id)
    .single();
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

export const getMyProfilName = async () => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', user.id)
    .single();
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

export const getProfileName = async ({ user_name }: { user_name?: string }) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('username', user_name ?? user)
    .single();
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

export async function updateAvatarProfile(fileData: string) {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }

  // CONVERT BASE64 TO BINARY
  const base64Data = fileData.split(',')[1];
  const binaryData = Buffer.from(base64Data, 'base64');

  // UPLOAD NEW AVATAR
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`${user.id}/avatar`, binaryData, {
      upsert: true,
      contentType: 'image/png',
    });

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }
  if (!data) {
    return {
      data: null,
      error: 'No data',
    };
  }

  // GET NEW AVATAR URL
  const { data: avatar_url } = await supabase.storage
    .from('avatars')
    .getPublicUrl(`${user.id}/avatar`);

  const { error: updateError } = await supabase
    .from('profile')
    .update({
      avatar_url: avatar_url.publicUrl,
    })
    .eq('id', user.id);

  if (updateError) {
    return {
      data: null,
      error: updateError.message,
    };
  }

  return { data: avatar_url, error: null };
}
