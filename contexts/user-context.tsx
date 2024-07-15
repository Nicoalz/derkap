"use client";
import { User } from '@supabase/supabase-js';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { TUserDb } from '../types';

interface UserContextType {
  userFeeds: string[];
  baseFeeds: string[]
  selectedFeed: string;
  setSelectedFeed: (feed: string) => void;
  userData: TUserDb,
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  user: User | null;
  profile: TUserDb | null;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, user, profile }) => {
  const baseFeeds = ['Amis']
  const [userFeeds, setUserFeeds] = useState<string[]>([]);
  const [selectedFeed, setSelectedFeed] = useState(baseFeeds[0]);
  const userData: TUserDb = { id: user?.id ?? "", name: profile?.name ?? "", username: profile?.username ?? "", avatar_url: '/nico.jpeg', created_at: user?.created_at ?? "" }


  const fetchUserFeeds = (_userId: string) => {

    //todo: fetch user feeds from the server
    const fetchedFeeds = ['La Folie des Road Trips', 'Les FR en ES'];
    const userFeeds = [...baseFeeds, ...fetchedFeeds];
    // Mocked user feeds
    setUserFeeds(userFeeds);
  }


  useEffect(() => {
    fetchUserFeeds('123');
  }, []);

  return (
    <UserContext.Provider value={{ userFeeds, baseFeeds, selectedFeed, setSelectedFeed, userData }}>
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
