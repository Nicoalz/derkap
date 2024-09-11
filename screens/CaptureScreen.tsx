'use client';

import ChallengerBox from '@/components/ChallengeBox';
import { useUser } from '@/contexts/user-context';
import { TChallenge, TPostDb } from '@/types';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { toast } from 'sonner';
import Button from '../components/Button';
import Title from '../components/Title';
import { pushPostToDb } from '../functions/supabase/post/push-post-db';
import { mockedChallenges } from '../libs/mockedChallenges';
import { getRandomAudio } from '../app/audio/audioManager';
import { useSoundStore } from '../app/audio/useSoundStore';

const CaptureScreen: React.FC = () => {
  const router = useRouter();
  const { isSoundEnabled } = useSoundStore();
  const [challenge, setChallenge] = useState<TChallenge | null>();
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [imgTaken, setImgTaken] = useState<string | null>(null);
  const webcamRef = React.useRef<Webcam>(null);
  const validateRef = React.useRef<HTMLButtonElement>(null);

  const capture = React.useCallback(
    () => {
      if (!webcamRef.current) return;
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;
      setImgTaken(imageSrc);
      if (validateRef.current) validateRef.current.scrollIntoView({ behavior: 'smooth' });
    },
    [webcamRef]
  );

  const [newDescription, setNewDescription] = useState<string>('');
  const { userFeeds, selectedFeed, setSelectedFeed, userData } = useUser();
  const [isValidatingFile, setIsValidatingFile] = useState<boolean>(false);

  const initChallenge = () => {
    const urlparams = new URLSearchParams(window.location.search);
    const challengeId = urlparams.get('challengeId');
    console.log({ challengeId });
    let challenge = mockedChallenges[0];
    if (challengeId) {
      challenge = mockedChallenges.find(ch => ch.id.toString() === challengeId) || mockedChallenges[0];
    }
    setChallenge(challenge);
  };

  useEffect(() => {
    initChallenge();
  }, []);

  const resetPhoto = () => {
    setImgTaken(null);
  };

  const playRandomSound = () => {
    if (isSoundEnabled) { 
      const audioFile = getRandomAudio();
      const audio = new Audio(audioFile);
      audio.play();
    } else {
      console.log("Le son est désactivé.");
    }
  };

  const validatePhoto = async () => {
    try {
      setIsValidatingFile(true);
      if (!imgTaken) return;

      playRandomSound();

      const post: TPostDb = {
        id: 0,
        is_photo: true,
        file_url: imgTaken,
        description: newDescription,
        user: userData,
        created_at: new Date().toISOString(),
        feed: selectedFeed.name,
        file_name: userData.id + '/' + new Date().toISOString(),
      };

      const { data, error } = await pushPostToDb({ post: post });
      if (error) {
        toast.error(error);
        return;
      }
      console.log(data);
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue');
    } finally {
      setIsValidatingFile(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <Title text='Capture ton Derkap !' />
      <div className='px-2'>
        {challenge && !imgTaken && (<ChallengerBox challenge={challenge} />)}
      </div>

      <div className="w-full mt-4 relative h-0 pb-[125%]">
        {imgTaken ? (
          <div className='absolute rounded-xl object-cover inset-0 h-full w-full bg-green-300'>
            <div
              onClick={() => resetPhoto()}
              className='absolute top-2 left-2 p-2 bg-custom-black text-white rounded-xl'>
              <XIcon className='w-6 h-6' />
            </div>
            <img src={imgTaken} alt='img taken' className='object-cover w-full h-full rounded-xl' />
          </div>
        ) : (
          <div>
            <Webcam className='absolute rounded-xl object-cover inset-0 h-full w-full'
              onDoubleClick={() => setFacingMode(facingMode === 'user' ? 'environment' : 'user')}
              mirrored={facingMode === 'user'}
              videoConstraints={{
                facingMode: facingMode,
              }}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
            />
            <div className='flex justify-center items-center'>
              <div
                onClick={() => capture()}
                id='capture'
                className='absolute w-20 h-20 border-[5px] border-gray-200 bg-blur-light bg bottom-2 rounded-full'>
              </div>
            </div>
          </div>
        )}
      </div>

      {imgTaken && (
        <div className='flex flex-col items-center justify-center w-full mt-2'>
          {isValidatingFile ? (
            <p className='mb-32 mt-4'>
              Chargement...
            </p>
          ) : (
            <Button ref={validateRef}
              id='validateCapture' disabled={isValidatingFile} onClick={() => validatePhoto()} text='Poster mon derkap de fou' className='mt-4 mb-32 mx-auto w-full font-champ text-xl' />
          )}
        </div>
      )}
    </div>
  );
};

export default CaptureScreen;
