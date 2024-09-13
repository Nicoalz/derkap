import React from 'react';

const CaptureButton: React.FC<{ func: () => void }> = ({ func }) => {
  return (
    <div
      onClick={() => func()}
      className="w-20 h-20 border-[5px] border-gray-200 bg-gradient-linear rounded-full bottom-28 fixed"
    ></div>
  );
};

export default CaptureButton;
