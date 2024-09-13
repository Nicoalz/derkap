'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Button from '@/components/Button';
import Link from 'next/link';
import { User } from 'lucide-react';
import PullToRefresh from 'react-simple-pull-to-refresh';

const HomeScreen = () => {
  const handleRefresh = async () => {
    console.log('refreshing');
  };

  return (
    <div className="w-full flex flex-col items-center relative flex-1 mb-32 no-scrollbar">
      <div className="w-full flex justify-end p-8 ">
        <Link href={'/profile'} className="flex items-center gap-x-2">
          <User size={24} />
        </Link>
      </div>
      <PullToRefresh
        className="no-scollbar"
        pullingContent={''}
        onRefresh={handleRefresh}
      >
        <div className="relative flex flex-col w-full gap-8 no-scrollbar">
          <Drawer>
            <DrawerTrigger>
              <Button text="Open" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>
                  <Button text="Cancel" isCancel />
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </PullToRefresh>
    </div>
  );
};

export default HomeScreen;
