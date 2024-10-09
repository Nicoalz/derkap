'use client';
import { cn } from '@/libs/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const NoChallenge = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn('h-screen relative', className)}>
      <header className="w-full flex justify-between items-center p-4 md:px-12 h-fit relative">
        <Link href="/" className="flex items-center gap-x-2">
          <ChevronLeft size={24} />
        </Link>
        <Skeleton className="w-52 h-8 rounded abs-center" />
        <Skeleton className="h-5 w-16" />
      </header>
      {/* <div className="w-full flex items-start justify-center px-2 py-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
            style={{ zIndex: 5 - index }}
            key={index}
          >
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        ))}
      </div> */}

      <div className="w-full h-screen flex flex-col items-center justify-start gap-4 px-2 py-3">
        <div className="min-h-16 max-h-fit flex w-full px-4 bg-custom-white border border-custom-black rounded-xl py-2 text-custom-black shadow-element gap-4 items-center">
          <Skeleton className="w-10 h-10 aspect-square" />
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="w-3/4 h-4" />
            <div className="flex items-center gap-1">
              <p className="text-sm">Par</p>
              <Skeleton className="w-16 h-4" />
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-1 w-full ">
          <Skeleton className="w-full h-[504px]" />
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <p className="font-champ">@</p>
              <Skeleton className="w-16 h-4" />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <Skeleton className="w-4 h-4" />
              <p className="font-champ">vote(s)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed w-full bg-[#f8e9db] bottom-0 right-0">
        <div className="relative px-2 pb-8 pt-4">
          <div className="absolute left-0 -top-[1.6rem] z-[2] w-full h-[30px] bg-gradient-to-t from-[#f8e9db] to-[#f8e9db]/0 content-['']"></div>
          <Skeleton className="w-full h-9" />
        </div>
      </div>
    </div>
  );
};

export default NoChallenge;
