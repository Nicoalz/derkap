'use server';

import { createSupabaseAppServerClient } from '@/libs/supabase/server';

export const getGroups = async ({ user_id }: { user_id?: string }) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }
  const { data, error } = await supabase
    .from('group_profile')
    .select('group(*, members:group_profile(profile(*)))')
    .eq('profile_id', user_id ?? user.id);
  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }
  const groups = data.map(item => item.group).filter(group => group !== null);
  return {
    data: groups,
    error: null,
  };
};

export const createGroup = async ({ name }: { name: string }) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      data: null,
      error: 'User not found',
    };
  }
  if (!name) {
    return {
      data: null,
      error: 'Name is required',
    };
  }
  // INSERT TO GROUP TABLE
  const { data: group, error: errorGroup } = await supabase
    .from('group')
    .insert({ name: name, invite_code: null })
    .select('id')
    .single();

  if (errorGroup) {
    return {
      data: null,
      error: errorGroup.message,
    };
  }
  // INSERT IN MANY TO MANY TABLE
  const { data: group_profile, error: errorGroupProfil } = await supabase
    .from('group_profile')
    .insert({ profile_id: user.id, group_id: group.id })
    .select('group(*, members:group_profile(profile(*)))')
    .single();
  if (errorGroupProfil) {
    return {
      data: null,
      error: errorGroupProfil.message,
    };
  }

  return {
    data: group_profile.group,
    error: null,
  };
};

export const deleteGroup = async ({ group_id }: { group_id: number }) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      error: 'User not found',
    };
  }
  if (!group_id) {
    return {
      error: 'Id is required',
    };
  }
  // DELETE FROM GROUP TABLE
  const { error: errorGroup } = await supabase
    .from('group')
    .delete()
    .eq('id', group_id);
  if (errorGroup) {
    return {
      error: errorGroup.message,
    };
  }
  return {
    error: null,
  };
};

export const joinGroup = async ({ invite_code }: { invite_code: string }) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      error: 'User not found',
    };
  }
  if (!invite_code) {
    return {
      error: 'Invite code is required',
    };
  }
  // GET GROUP FROM INVITE CODE
  const { data: group, error: errorGroup } = await supabase
    .from('group')
    .select('*')
    .eq('invite_code', invite_code)
    .single();
  console.log({ group });
  if (errorGroup) {
    return {
      error: errorGroup.message,
    };
  }
  // INSERT IN MANY TO MANY TABLE
  const { error: errorGroupProfil } = await supabase
    .from('group_profile')
    .insert({ profile_id: user.id, group_id: group.id });
  if (errorGroupProfil) {
    return {
      error: errorGroupProfil.message,
    };
  }
  return {
    error: null,
  };
};

export const leaveGroup = async ({ group_id }: { group_id: string }) => {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) {
    return {
      error: 'User not found',
    };
  }
  if (!group_id) {
    return {
      error: 'Id is required',
    };
  }
  // DELETE FROM MANY TO MANY TABLE
  const { error: errorGroupProfil } = await supabase
    .from('group_profile')
    .delete()
    .eq('profile_id', user.id)
    .eq('group_id', group_id);
  if (errorGroupProfil) {
    return {
      error: errorGroupProfil.message,
    };
  }
  return {
    error: null,
  };
};
