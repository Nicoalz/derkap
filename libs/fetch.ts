//import { getAuthToken } from './supabase';

export const fetchWithToken = async (url: string, config?: RequestInit, token?: string): Promise<Response> => {
  // token will be used to auth for api
  //const authToken = token ?? (await getAuthToken());

  return fetch(url, {
    ...config,
    headers: {
      ...config?.headers,
      //'x-auth-token': authToken!,
    },
  });
};
