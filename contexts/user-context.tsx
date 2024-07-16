"use client";
import { User } from '@supabase/supabase-js';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { mockedFeeds } from '../libs/mockedFeeds';
import { TFeed, TUserDb } from '../types';

interface UserContextType {
  userFeeds: TFeed[];
  selectedFeed: TFeed;
  setSelectedFeed: (feed: TFeed) => void;
  userData: TUserDb,
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  user: User | null;
  profile: TUserDb | null;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, user, profile }) => {
  const baseFeed: TFeed = {
    name: 'Amis',
    kapsId: 'kaps0',
    id: '0'
  }
  const [userFeeds, setUserFeeds] = useState<TFeed[]>([baseFeed]);
  const [selectedFeed, setSelectedFeed] = useState(baseFeed);
  const userData: TUserDb = { id: user?.id ?? "", name: profile?.name ?? "", username: profile?.username ?? "", avatar_url: profile?.avatar_url || '/mrderka.png', created_at: user?.created_at ?? "" }


  const fetchUserFeeds = (_userId: string) => {

    //todo: fetch user feeds from the server
    const fetchedFeeds = mockedFeeds
    const userFeeds = [baseFeed, ...fetchedFeeds];
    // Mocked user feeds
    setUserFeeds(userFeeds);
  }

  useEffect(() => {
    console.log({ selectedFeed })
  }, [selectedFeed])


  useEffect(() => {
    fetchUserFeeds('123');
  }, []);

  return (
    <UserContext.Provider value={{ userFeeds, selectedFeed, setSelectedFeed, userData }}>
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
