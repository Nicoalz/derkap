'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const transition = { ease: 'easeInOut', duration: 0.3 };

interface PageProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  title: string;
}

export default function PageTransition({
  children,
  title,
  ...props
}: PageProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.title = title;
  }, [title]);

  const variants = {
    enter: () => {
      const isPush = pathname !== '/';
      return {
        x: 0,
        transition,
        transitionEnd: {
          position: 'static',
        },
        ...(isPush
          ? {
              position: 'fixed',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }
          : {}),
      };
    },
    initial: () => {
      const isPush = pathname !== '/';
      return {
        x: isPush ? '100%' : '-25%',
        boxShadow: isPush ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : null,
        transition,
        ...(isPush
          ? {
              position: 'fixed',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }
          : {}),
      };
    },
    exit: ({ action }: { action: string }) => {
      const isPop = action === 'POP';
      return {
        x: isPop ? '100%' : '-10%',
        zIndex: isPop ? 1 : -1,
        boxShadow: isPop ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : null,
        transition,
        ...(isPop
          ? {
              position: 'fixed',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }
          : {}),
      };
    },
  };

  return (
    <motion.main
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      {...(props as any)}
    >
      {children}
    </motion.main>
  );
}
