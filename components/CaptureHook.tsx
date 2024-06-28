import { useUser } from '@/contexts/user-context';
import { TPostDb } from '@/types';
import { ArrowLeftIcon, ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline';
import React, { useState } from "react";
import Webcam from "react-webcam";
import { toast } from 'sonner';
import { pushPostToDb } from '../functions/supabase/post/push-post-db';
import { cn } from '../functions/utils';
import CaptureButton from './CaptureButton';
const Capture: React.FC<{
  setIsCaptureOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNewPost: (post: TPostDb) => void;
}> = ({
  setIsCaptureOpen,
  addNewPost
}) => {
    const [imgTaken, setImgTaken] = useState<string | null>(null);
    const webcamRef = React.useRef<Webcam>(null);
    const capture = React.useCallback(
      () => {
        if (!webcamRef.current) return
        const imageSrc = webcamRef.current.getScreenshot();
        setImgTaken(imageSrc);
      },
      [webcamRef]
    );

    const [newDescription, setNewDescription] = useState<string>('');
    const { userFeeds, selectedFeed, setSelectedFeed, userData } = useUser();
    const [isValidatingFile, setIsValidatingFile] = useState<boolean>(false);
    const resetPhoto = () => {
      setImgTaken(null);
    };

    const validatePhoto = async () => {
      try {
        setIsValidatingFile(true);
        if (!imgTaken) return;
        const post: TPostDb = {
          id: 0,
          is_photo: true,
          file_url: imgTaken,
          description: newDescription,
          user: userData,
          created_at: new Date().toISOString(),
          feed: selectedFeed,
          file_name: userData.id + '/' + new Date().toISOString(),
        }
        const { data, error } = await pushPostToDb({ post: post });
        if (error) {
          toast.error(error);
          return;
        }
        console.log(data);
        data && addNewPost(data);
        setIsCaptureOpen(false);
      } catch (error) {
        console.error(error);
        toast.error('Une erreur est survenue');

      } finally {
        setIsValidatingFile(false);
      }
    }

    return (
      <div className="flex flex-col w-full items-center">
        <div className="flex justify-between items-center font-bold text-xl mb-4 w-full px-8">
          <div
            onClick={() => setIsCaptureOpen(false)}
            className='bg-custom-primary p-1 rounded-md'>
            <ArrowLeftIcon className="w-6 h-6 " />
          </div>
          <p>Capture ton défi !</p>

        </div>
        <div className="w-full max-w-xs">

          {imgTaken ? (
            <img src={imgTaken} alt='img taken' className='rounded-md w-full h-full' />
          ) : (
            <Webcam className='rounded-md'
              mirrored={true}
              // videoConstraints={{
              //   width: 320,
              //   height: 400,
              //   facingMode: "user"
              // }}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              // width={320}
              // height={400}
              screenshotQuality={1}
            />
          )}
        </div>
        {imgTaken ? (
          <div className='flex flex-col items-center justify-center w-full mt-2'>
            <div className='flex flex-col items-center w-full'>
              <div className='flex flex-col justify-center items-start'>
                <p className='text-gray-500 font-bold text-xs'>FEED</p>
                <select
                  value={selectedFeed}
                  onChange={(e) => setSelectedFeed(e.target.value)}
                  className='rounded-sm border border-none text-white bg-custom-primary p-1'>
                  {userFeeds.map((feed, index) => (
                    <option key={index} value={feed}>{feed}</option>
                  ))}
                </select>
              </div>
              <div className='w-3/4 justify-center items-center'>
                <p className='text-gray-500 font-bold text-xs'>DESCRIPTION</p>
                <input type='text'
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder='Raconte pas ta vie...'
                  className='text-xs w-full rounded-sm border border-none px-2 py-1 focus:outline-none text-white bg-custom-primary placeholder:text-white/50'
                />
              </div>
            </div>
            <div className='flex items-center justify-between mt-2'>
              <div
                onClick={() => resetPhoto()}
                className='bg-custom-primary p-2 rounded-md mx-4'>
                <ArrowPathIcon className="w-8 h-8 " />
              </div>
              <button type='button'
                disabled={isValidatingFile}
                onClick={() => validatePhoto()}
                className={cn('bg-custom-primary p-2 rounded-md mx-4', { "bg-gray-400": isValidatingFile })}>
                <CheckIcon className="w-8 h-8 " />
              </button>
            </div>
          </div>
        ) : (
          <CaptureButton
            func={() => capture()}
          />
        )}
      </div>
    );
  };


export default Capture;


