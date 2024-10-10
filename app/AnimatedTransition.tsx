'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

interface AnimatedSwitchProps {
  children: React.ReactNode;
}

const AnimatedSwitch: React.FC<AnimatedSwitchProps> = ({ children }) => {
  const path = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false} custom={{ action: path }}>
      <div key={path}>{children}</div>
    </AnimatePresence>
  );
};

export default AnimatedSwitch;
