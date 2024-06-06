"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { TUser } from '../types';

interface UserContextType {
  userFeeds: string[];
  baseFeeds: string[]
  selectedFeed: string;
  setSelectedFeed: (feed: string) => void;
  userData: TUser,
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const baseFeeds = ['Amis']
  const [userFeeds, setUserFeeds] = useState<string[]>([]);
  const [selectedFeed, setSelectedFeed] = useState(baseFeeds[0]);
  const userData: TUser = { name: 'Nicolas', username: 'Nicoalz', img: '/nico.jpeg' }


  const fetchUserFeeds = (_userId: string) => {

    //todo: fetch user feeds from the server
    const fetchedFeeds = ['IIMPACT', 'Paris 15'];
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
