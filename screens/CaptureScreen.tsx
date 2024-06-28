'use client';

import CaptureButton from '@/components/CaptureButton';
import ChallengerBox from '@/components/ChallengeBox';
import { useUser } from '@/contexts/user-context';
import { TChallenge, TPostDb } from '@/types';
import { XIcon } from 'lucide-react';
import React, { useState } from "react";
import Webcam from "react-webcam";
import { toast } from 'sonner';
import Button from '../components/Button';
import Title from '../components/Title';
import { pushPostToDb } from '../functions/supabase/post/push-post-db';
import { mockedChallenges } from '../libs/mockedChallenges';
const CaptureScreen: React.FC = () => {
  const [challenge, setChallenge] = useState<TChallenge | null>(mockedChallenges[1]);

  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [imgTaken, setImgTaken] = useState<string | null>(null);
  const webcamRef = React.useRef<Webcam>(null);
  const capture = React.useCallback(
    () => {
      if (!webcamRef.current) return
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;
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
      const post: TPostDb = { // todo select good feed
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

    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue');

    } finally {
      setIsValidatingFile(false);
    }
  }

  return (
    <div className="flex flex-col w-full items-center">


      <Title text='Capture ton Derkap !' />
      {challenge && !imgTaken && (<ChallengerBox challenge={challenge} />)}
      <div className="w-full mt-4 relative h-0  pb-[125%]">

        {imgTaken ? (
          <div className='absolute rounded-xl object-cover inset-0 h-full w-full bg-green-300'>
            <div
              onClick={() => resetPhoto()}
              className='absolute top-2 left-2 p-2 bg-custom-black text-white rounded-xl'>
              <XIcon className='w-6 h-6' />
            </div>
            <img src={imgTaken} alt='img taken' className='object-cover w-full h-full rounded-xl ' />
          </div>
        ) : (

          <Webcam className='absolute rounded-xl object-cover inset-0 h-full w-full'
            onDoubleClick={() => setFacingMode(facingMode === 'user' ? 'environment' : 'user')}
            mirrored={facingMode === 'user'}
            videoConstraints={{
              // width: 1920,
              // height: 2400,
              facingMode: facingMode,
              //aspectRatio: 5 / 4
              //aspectRatio: 4 / 5
            }}

            ref={webcamRef}
            screenshotFormat="image/jpeg"
            // width={1920}
            // height={2400}
            screenshotQuality={1}
          />
        )}
      </div>
      {imgTaken ? (
        <div className='flex flex-col items-center justify-center w-full mt-2'>
          <div className='w-full justify-center items-center'>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder='Raconte pas trop ta vie par contre...'
              className='w-full resize-none shadow-card px-4 py-2 rounded-xl min-h-40 flex focus:ring-none focus:outline-none border border-custom-black text-black'
            />
          </div>
          {
            // todo add disabled={isValidatingFile} to button
          }
          <Button disabled={isValidatingFile} onClick={() => validatePhoto()} text='Poster mon derkap de fou' className='my-4 mx-auto w-full font-champ text-xl' />
        </div>
      ) : (
        <CaptureButton
          func={() => capture()}
        />
      )}
    </div>
  );
};


export default CaptureScreen;


