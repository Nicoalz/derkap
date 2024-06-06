import React from "react";

const CaptureButton: React.FC<{ func: () => void }> = ({
  func,
}) => {
  return (
    <div
      onClick={() => func()}
      className='w-16 h-16 border-[5px] border-custom-primary bg-custom-primary/40 rounded-full bottom-28 fixed'>
    </div>
  );
};

export default CaptureButton;
