"use client";
import { User } from '@supabase/supabase-js';
import { ReactNode, createContext, useContext} from 'react';
import { TUserDb } from '../types';

interface UserContextType {
  userData: TUserDb,
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  user: User | null;
  profile: TUserDb | null;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, user, profile }) => {

  const userData: TUserDb = { id: user?.id ?? "", name: profile?.name ?? "", username: profile?.username ?? "", avatar_url: profile?.avatar_url || '/mrderka.png', created_at: user?.created_at ?? "" }

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
