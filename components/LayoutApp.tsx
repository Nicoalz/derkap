"use client";


import { usePWA } from "@/contexts/pwa-context";
import NoPwaScreen from "@/screens/NoPwaScreen";
import React from "react";
import BottomNavbar from "./BottomNavbar";
import Footer from "./Footer";
import Header from "./Header";
interface LayoutProps {
  children: React.ReactNode;
}

const LayoutApp: React.FC<LayoutProps> = ({ children }) => {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === "true";
  const { isPWA } = usePWA();
  if (isMaintenance) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Derkap is under maintenance</h1>
        <p className="text-lg mt-4 text-gray-400">
          We just need some time to make it better !
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen">
      <Header />

      {isPWA ? (
        <>
          <main className="container mx-auto flex-1 flex flex-col">
            {children}
          </main>
          <BottomNavbar />
        </>
      ) :
        (
          <>
            <div className='container mx-auto flex-1 flex flex-col justify-center'>
              <NoPwaScreen />
            </div>
            <Footer />
          </>
        )
      }
    </div>
  );
};

export default LayoutApp;
