import React from "react";

const CaptureButton: React.FC<{ setIsCaptureOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setIsCaptureOpen,
}) => {
  return (
    <div
      onClick={() => setIsCaptureOpen(true)}
      className='w-16 h-16 border-[5px] border-custom-primary bg-custom-primary/40 rounded-full bottom-28 fixed'>
    </div>
  );
};

export default CaptureButton;
