'use client';
import { User } from '@supabase/supabase-js';
import { ReactNode, createContext, useContext, useState } from 'react';
import { TProfileDB } from '../types/types';

interface UserContextType {
  userData: TProfileDB & { avatarTimestamp: number };
  updateUserData: (newData: Partial<TProfileDB>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  user: User | null;
  profile: TProfileDB | null;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  user,
  profile,
}) => {
  const [userData, setUserData] = useState<
    TProfileDB & { avatarTimestamp: number }
  >({
    id: user?.id ?? '',
    username: profile?.username ?? '',
    avatar_url: profile?.avatar_url || '/mrderka.png',
    created_at: user?.created_at ?? '',
    email: profile?.email ?? '',
    avatarTimestamp: Date.now(),
  });

  const updateUserData = (newData: Partial<TProfileDB>) => {
    setUserData(prevData => ({
      ...prevData,
      ...newData,
      avatarTimestamp: newData.avatar_url
        ? Date.now()
        : prevData.avatarTimestamp,
    }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
