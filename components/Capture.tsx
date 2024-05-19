import { ArrowLeftIcon, ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from "react";
import CaptureButton from './CaptureButton';
const Capture: React.FC<{ setIsCaptureOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setIsCaptureOpen,
}: {
  setIsCaptureOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    // Get access to the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Error accessing camera: ", err);
      });
  }, []);

  const takePhoto = () => {
    const width = 320; // Desired width of the photo
    const height = 320 / (4 / 5); // Maintain 4:5 aspect ratio

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
      }
    }
  };

  const closePhoto = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        setHasPhoto(false);
      }
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex justify-between items-center font-bold text-xl mb-4 w-full px-8">
        <div
          onClick={() => setIsCaptureOpen(false)}
          className='bg-custom-primary p-1 rounded-sm'>
          <ArrowLeftIcon className="w-6 h-6 " />
        </div>
        <p>Capture ton défi !</p>

      </div>
      <div className="relative w-full max-w-xs">
        <video ref={videoRef} className="rounded-md w-full" autoPlay playsInline />
        <canvas width={320} height={320 / (4 / 5)} ref={canvasRef} className={`absolute top-0 left-0 w-full ${hasPhoto ? 'block' : 'hidden'}`} />
      </div>
      {hasPhoto && (
        <div className='w-full flex items-center justify-between'>
          <div
            onClick={() => closePhoto()}
            className='bg-custom-primary p-1 rounded-sm'>
            <ArrowPathIcon className="w-6 h-6 " />
          </div>
          <div
            onClick={() => console.log('Photo saved')}
            className='bg-custom-primary p-1 rounded-sm'>
            <CheckIcon className="w-6 h-6 " />
          </div>
        </div>
      )}
      <CaptureButton
        func={() => takePhoto()}
      />
    </div>
  );
};

export default Capture;
