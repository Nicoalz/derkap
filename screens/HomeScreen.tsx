'use client';

import { User } from 'lucide-react';
import Link from 'next/link';
import PullToRefresh from 'react-simple-pull-to-refresh';


const HomeScreen = () => {

  const handleRefresh = async () => {
    console.log('refreshing');
  }

  return (
    <div className="w-full flex flex-col items-center relative flex-1 mb-32 no-scrollbar">
      <div className='w-full flex justify-end  p-8 '>
        <Link href={"/profile"} className='flex items-center gap-x-2'>
          <User size={24} />
        </Link>
      </div>
      <PullToRefresh className='no-scollbar' pullingContent={""} onRefresh={handleRefresh}>
        <div className='relative flex flex-col w-full gap-8 no-scrollbar'>
        </div>
      </PullToRefresh>
    </div>
  );
};

export default HomeScreen;
