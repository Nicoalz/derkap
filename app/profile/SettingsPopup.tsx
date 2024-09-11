import React from 'react';
import { XIcon } from 'lucide-react';
import { useSoundStore } from '../audio/useSoundStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ isOpen, onClose }) => {
  const { isSoundEnabled, toggleSound } = useSoundStore();

  const handleToggle = () => {
    console.log('Toggle clicked');
    toggleSound();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white w-11/12">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-lg font-bold">Paramètres</DialogTitle>
          <DialogClose asChild>
          </DialogClose>
        </DialogHeader>

        <div className="flex items-center justify-between mt-4">
          <span className="text-md">Activer le son</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={isSoundEnabled}
              onChange={handleToggle}
            />
            <div
              className={`w-11 h-6 rounded-full transition ${isSoundEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
            ></div>
            <span
              className={`absolute left-1 top-1 w-4 h-4 bg-white border border-gray-300 rounded-full transition ${isSoundEnabled ? 'translate-x-5' : 'translate-x-0'}`}
            ></span>
          </label>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPopup;
