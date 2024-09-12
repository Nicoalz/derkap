/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { cn } from "@/libs/utils";

// eslint-disable-next-line no-undef
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-custom-black/20', className)} {...props} />;
}

export { Skeleton };
