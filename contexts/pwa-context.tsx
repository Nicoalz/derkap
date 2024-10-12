/* eslint-disable no-undef */
'use client';
import { usePathname } from 'next/navigation';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface PWAContextType {
  isPWA: boolean;
  currentPath: string;
  isReady: boolean;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

interface PWAProviderProps {
  children: ReactNode; // This defines that the provider expects children elements
}

export const PWAProvider: React.FC<PWAProviderProps> = ({ children }) => {
  const [isPWA, setIsPWA] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const isStandaloneAndroid = () =>
    window.matchMedia('(display-mode: fullscreen)').matches;
  const isStandaloneiOS = () =>
    ('standalone' in window.navigator &&
      window.navigator.standalone) as boolean;

  useEffect(() => {
    const isPWAAndroid = isStandaloneAndroid();
    const isPWAIOS = isStandaloneiOS();

    setIsPWA(isPWAAndroid || isPWAIOS);
    setIsReady(true);
  }, []);

  return (
    <PWAContext.Provider value={{ isPWA, currentPath, isReady }}>
      {children}
    </PWAContext.Provider>
  );
};

export const usePWA = (): PWAContextType => {
  const context = useContext(PWAContext);

  if (context === undefined) {
    throw new Error('usePWA must be used within a PWAProvider');
  }

  return context;
};
