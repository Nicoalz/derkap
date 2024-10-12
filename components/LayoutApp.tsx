'use client';

import { usePWA } from '@/contexts/pwa-context';
import React from 'react';
import NoPwaScreen from '@/screens/NoPwaScreen';
import Footer from './Footer';
interface LayoutProps {
  children: React.ReactNode;
}

const LayoutApp: React.FC<LayoutProps> = ({ children }) => {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === 'true';
  const isProduction = process.env.NODE_ENV === 'production';
  const { isPWA } = usePWA();
  // const isPWA = true;

  if (isMaintenance) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Derkap est en maintenance</h1>
        <p className="text-lg mt-4 text-gray-400">
          Encore un peu de patience !
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen dark">
      {isPWA && isProduction ? (
        <NoPwaScreen />
      ) : (
        <>
          <main className="h-full container mx-auto flex-1 flex flex-col">
            {children}
          </main>
        </>
      )}
    </div>
  );
};

export default LayoutApp;
