'use client';
import { cn } from '@/libs/utils';
import { useState } from 'react';
import CaptureScreen from '@/screens/CaptureScreen';
import Button from '@/components/Button';
interface PostNotTakenProps extends React.HTMLAttributes<HTMLDivElement> {
  fetchAllGroupData: () => Promise<void>;
  challenge_id: number;
}

const PostNotTaken = ({
  className,
  challenge_id,
  fetchAllGroupData,
  ...props
}: PostNotTakenProps) => {
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  return (
    <div {...props} className={cn('', className)}>
      {isCapturing ? (
        <CaptureScreen
          setIsCapturing={setIsCapturing}
          fetchAllGroupData={fetchAllGroupData}
          challenge_id={challenge_id}
        />
      ) : (
        <div>
          <div className="aspect-square w-full rounded-md bg-gray-400 flex items-center justify-center">
            <p className="text-white">C’est le moment réaliser ton défi !</p>
          </div>
          <Button
            text="Prends ton Derkap"
            onClick={() => {
              setIsCapturing(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PostNotTaken;
