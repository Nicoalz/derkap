"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface FeedContextType {
  userFeeds: string[];
  baseFeeds: string[]
  selectedFeed: string;
  setSelectedFeed: (feed: string) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

interface FeedProviderProps {
  children: ReactNode;
}

export const FeedProvider: React.FC<FeedProviderProps> = ({ children }) => {
  const baseFeeds = ['Amis']
  const [userFeeds, setUserFeeds] = useState<string[]>([]);
  const [selectedFeed, setSelectedFeed] = useState(baseFeeds[0]);

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
    <FeedContext.Provider value={{ userFeeds, baseFeeds, selectedFeed, setSelectedFeed }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = (): FeedContextType => {
  const context = useContext(FeedContext);

  if (context === undefined) {
    throw new Error("useFeed must be used within a FeedProvider");
  }

  return context;
};

export default FeedContext;
