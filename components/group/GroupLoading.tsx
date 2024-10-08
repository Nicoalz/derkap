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
    <div {...props} className={cn('h-screen', className)}>
      <header className="w-full flex justify-between items-center p-4 md:px-12 h-fit relative">
        <Link href="/" className="flex items-center gap-x-2">
          <ChevronLeft size={24} />
        </Link>
        <Skeleton className="w-52 h-8 rounded abs-center" />
        <Skeleton className="h-5 w-16" />
      </header>
      <div className="w-full flex items-start justify-center px-6 py-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
            style={{ zIndex: 5 - index }}
            key={index}
          >
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        ))}
      </div>

      <div className="w-full h-[80%] flex flex-col items-center justify-start gap-8 px-6 py-3">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full aspect-square" />
        <Skeleton className="py-2 px-4 text-sm text-transparent">
          Prends ton Derkap
        </Skeleton>
      </div>
    </div>
  );
};

export default NoChallenge;
