import React, { useEffect, useRef, useState } from "react";

const Capture: React.FC = () => {
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
      <h1 className="font-bold text-xl mb-4">
        Capture ton défi !
      </h1>
      <div className="relative w-full max-w-xs">
        <video ref={videoRef} className="rounded-md w-full" autoPlay playsInline />
        <canvas ref={canvasRef} className={`absolute top-0 left-0 w-full ${hasPhoto ? 'block' : 'hidden'}`} />
      </div>
      <button onClick={takePhoto} className="mt-4 p-2 bg-custom-primary text-white rounded">
        Take Photo
      </button>
      {hasPhoto && (
        <button onClick={closePhoto} className="mt-2 p-2 bg-red-500 text-white rounded">
          Retake Photo
        </button>
      )}
    </div>
  );
};

export default Capture;
