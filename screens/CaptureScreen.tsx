/* eslint-disable @next/next/no-img-element */
'use client';
import Button from '@/components/Button';
import { XIcon, ArrowLeftIcon, RefreshCcw, Timer } from 'lucide-react';
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { toast } from 'sonner';
import { getRandomAudio } from '../app/audio/audioManager';
import { useSoundStore } from '../app/audio/useSoundStore';
import Title from '../components/Title';
import { pushPostToDb } from '@/functions/post-action';
import Loader from '../components/Loader';
import { TChallengeDB } from '@/types/types';

const CaptureScreen: React.FC<{
  setIsCapturing: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAllGroupData: () => Promise<void>;
  challenge: TChallengeDB;
}> = ({ setIsCapturing, fetchAllGroupData, challenge }) => {
  const { isSoundEnabled } = useSoundStore();
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [imgTaken, setImgTaken] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const webcamRef = React.useRef<Webcam>(null);
  const validateRef = React.useRef<HTMLButtonElement>(null);
  const [captureDelay, setCaptureDelay] = useState<0 | 3 | 5 | 10>(0);
  const [countdown, setCountdown] = useState<number | null>(null); // State to manage countdown

  const handleCaptureDelay = () => {
    switch (captureDelay) {
      case 0:
        setCaptureDelay(3);
        break;
      case 3:
        setCaptureDelay(5);
        break;
      case 5:
        setCaptureDelay(10);
        break;
      case 10:
        setCaptureDelay(0);
        break;
    }
  };

  const handleCapture = async () => {
    if (captureDelay === 0) {
      capture();
    } else {
      startCountdown();
    }
  };

  // Countdown logic
  const startCountdown = () => {
    setCountdown(captureDelay); // Set the countdown to the current delay

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null) return null;
        if (prev === 1) {
          clearInterval(interval);
          capture(); // Capture the image when countdown reaches 0
          return null;
        }
        return prev - 1; // Decrement countdown
      });
    }, 1000);
  };

  const capture = React.useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    setImgTaken(imageSrc);
    if (validateRef.current)
      validateRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [webcamRef]);

  const [isValidatingFile, setIsValidatingFile] = useState<boolean>(false);

  const resetPhoto = () => {
    setImgTaken(null);
  };

  const playRandomSound = () => {
    if (isSoundEnabled) {
      const audioFile = getRandomAudio();
      const audio = new Audio(audioFile);
      audio.play();
    }
  };

  const validatePhoto = async () => {
    try {
      setIsValidatingFile(true);
      if (!imgTaken) return;

      playRandomSound();

      if (!challenge) {
        throw new Error('Challenge not found');
      }

      const post = {
        file_url: imgTaken,
        challenge_id: challenge?.id,
      };

      const { error } = await pushPostToDb({ post });

      if (error) {
        throw new Error(error);
      }

      setIsRedirecting(true);
      setIsCapturing(false);
    } catch (error) {
      toast.error('Une erreur est survenue: ' + error);
    } finally {
      setIsValidatingFile(false);
      fetchAllGroupData();
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <Title text="Capture ton Derkap !" />

      <div className="w-full mt-4 relative h-0 pb-[125%]">
        {imgTaken ? (
          <div className="absolute rounded-xl object-cover inset-0 h-full w-full bg-green-300">
            <div
              onClick={() => resetPhoto()}
              className="absolute top-2 left-2 p-2 bg-custom-black text-white rounded-xl"
            >
              <XIcon className="w-6 h-6" />
            </div>
            <img
              src={imgTaken}
              alt="img taken"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
        ) : (
          <div>
            <Webcam
              className="absolute rounded-xl object-cover inset-0 h-full w-full"
              onDoubleClick={() =>
                setFacingMode(facingMode === 'user' ? 'environment' : 'user')
              }
              mirrored={facingMode === 'user'}
              videoConstraints={{
                facingMode: facingMode,
              }}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
            />
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 font-champ">
                <p className="text-white text-6xl font-bold">{countdown}</p>
              </div>
            )}
            <div
              onClick={handleCaptureDelay}
              className="absolute top-2 right-2 p-2 bg-custom-black text-white rounded-xl flex gap-x-2"
            >
              <Timer className="w-6 h-6" />
              <p>{captureDelay}s</p>
            </div>
            <div
              onClick={() =>
                setFacingMode(facingMode === 'user' ? 'environment' : 'user')
              }
              className="absolute bottom-2 right-2 p-2 bg-custom-black text-white rounded-xl"
            >
              <RefreshCcw className="w-6 h-6" />
            </div>
            <div
              onClick={() => setIsCapturing(false)}
              className="absolute top-2 left-2 p-2 bg-custom-black text-white rounded-xl"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </div>
            <div className="flex justify-center items-center">
              <div
                onClick={handleCapture}
                id="capture"
                className="absolute w-20 h-20 border-[5px] border-gray-200 bg-blur-light bg bottom-2 rounded-full"
              ></div>
            </div>
          </div>
        )}
      </div>

      {imgTaken && (
        <div className="flex flex-col items-center justify-center w-full mt-2">
          {isValidatingFile || isRedirecting ? (
            <Loader className="mb-32 mt-4" />
          ) : (
            <Button
              ref={validateRef}
              id="validateCapture"
              disabled={isValidatingFile || isRedirecting}
              onClick={() => validatePhoto()}
              text="Poster mon derkap de fou"
              className="mt-4 mb-32 mx-auto w-full font-champ text-xl"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CaptureScreen;
