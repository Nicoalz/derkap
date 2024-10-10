'use client';
import { cn, getStatusLabel } from '@/lib/utils';
import { Database } from '@/types/supabase';
import { Skeleton } from './ui/skeleton';

interface StatusLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  challengeStatus?: Database['public']['Tables']['challenge']['Row']['status'];
}

const StatusLabel = ({ challengeStatus, ...props }: StatusLabelProps) => {
  const statusColorMap: {
    [key in Database['public']['Tables']['challenge']['Row']['status']]: string;
  } = {
    posting: 'bg-orange-400',
    voting: 'bg-yellow-400',
    ended: 'bg-gray-400',
  };

  if (!challengeStatus) return <Skeleton className="w-20 h-5" />;

  return (
    <div
      className={cn(
        'rounded-md px-2.5 py-0.5 text-xs font-semibold text-white w-fit',
        statusColorMap[challengeStatus],
      )}
    >
      <p className="text-center">
        {getStatusLabel({ status: challengeStatus })}
      </p>
    </div>
  );
};

export default StatusLabel;
