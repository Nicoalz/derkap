import { TPost } from '@/types';
import { ArrowLeftIcon, ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from "react";
import CaptureButton from './CaptureButton';
const Capture: React.FC<{
  setIsCaptureOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToFeed: (post: TPost) => void;
}> = ({
  setIsCaptureOpen,
  addToFeed
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [imgTaken, setImgTaken] = useState<string | null>(null);

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
      const desiredWidth = 320; // Desired width of the photo
      const desiredHeight = 320 / (4 / 5); // Maintain 4:5 aspect ratio

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          // Calculate the size and position of the cropping area
          const cropWidth = videoWidth;
          const cropHeight = videoWidth * (4 / 5);
          const cropX = 0;
          const cropY = (videoHeight - cropHeight) / 2;

          canvas.width = desiredWidth;
          canvas.height = desiredHeight;

          context.translate(desiredWidth, 0);
          context.scale(-1, 1);
          context.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, desiredWidth, desiredHeight);
          setHasPhoto(true);
          console.log('Photo taken')
          const img = canvas.toDataURL('image/png');
          setImgTaken(img);
        };
      };
    }

    const closePhoto = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          setHasPhoto(false);
          console.log('Photo closed')
        }
      }
    };

    const validatePhoto = () => {
      if (!imgTaken) return;
      addToFeed({
        isPhoto: true,
        url: imgTaken,
        description: 'Chokbar le chauve',
        user: { name: 'Nicolas', username: 'Nicoalz', img: 'https://picsum.photos/11' },
        date: '2021-06-01',
      });
      setIsCaptureOpen(false);
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
        <div className="relative w-full max-w-xs">
          <video
            ref={videoRef}
            className={`rounded-md w-full transform scale-x-[-1] ${hasPhoto ? "hidden" : "block"}`} // Flip video horizontally
            autoPlay
            playsInline
          />
          <canvas width={320} height={320 / (4 / 5)} ref={canvasRef} className={`w-full h-fit rounded-md`} />
        </div>
        {hasPhoto ? (
          <div className='flex items-center justify-between mt-2'>
            <div
              onClick={() => closePhoto()}
              className='bg-custom-primary p-2 rounded-md mx-4'>
              <ArrowPathIcon className="w-8 h-8 " />
            </div>
            <div
              onClick={() => validatePhoto()}
              className='bg-custom-primary p-2 rounded-md mx-4'>
              <CheckIcon className="w-8 h-8 " />
            </div>
          </div>
        ) : (
          <CaptureButton
            func={() => takePhoto()}
          />
        )}
      </div>
    );
  };


export default Capture;


